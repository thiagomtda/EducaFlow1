# 📄 EducaFlow Audit v1.0

> **Status:** Especificação Arquitetural V1.0 (Concluída)
> **Projeto:** EducaFlow — PWA Educacional Offline-First
> **Finalidade:** Contexto técnico para continuidade do projeto via IA ou desenvolvedores.

---

## 1. Visão Geral do Sistema
O **EducaFlow** é uma aplicação web progressiva (PWA) de alto desempenho focada na ergonomia e produtividade do professor do Ensino Fundamental I. Construído sob a filosofia **Offline-First**, o sistema permite o uso completo das rotinas diárias (chamada, lançamento de notas e registros de ocorrências) sem conexão com a internet, realizando a sincronização transparente com a nuvem quando a conexão é restabelecida.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Função / Descrição |
| :--- | :--- | :--- |
| **Framework Web** | Next.js 15 (App Router) + React 19 | Arquitetura de renderização híbrida e rotas de API |
| **Estilização & UI** | Tailwind CSS v4 + Lucide Icons | Design moderno de alto contraste otimizado para toque |
| **Linguagem** | TypeScript | Tipagem estática ponta a ponta |
| **Banco Local (Client)** | Dexie.js (IndexedDB) | Persistência local atômica e reativa para uso offline |
| **Banco Nuvem (Server)** | Supabase (PostgreSQL + RLS) | Persistência central na nuvem com Row Level Security |
| **Motor de IA** | `@google/genai` (Gemini 2.5 Flash) | Geração de planos de aula alinhados à BNCC |
| **Plataforma Mobile** | Web Manifest (PWA Standalone) | Instalação na tela inicial e comportamento nativo |

---

## 3. Arquitetura Offline-First & Motor de Sincronização

### 3.1 Fluxo de Dados (Write Flow)
1. **Ação do Usuário**: Alteração (chamada, nota ou ocorrência) é realizada na UI.
2. **Escrita Atômica**: O hook local salva no **Dexie IndexedDB** (`attendances`, `studentLogs` ou `grades`).
3. **Enfileiramento**: Na mesma transação (`rw`), cria-se um registro na tabela `syncQueue`.
4. **Trigger de Sync**: O estado atualiza e dispara `syncEngine.processQueue()`.

### 3.2 O Motor `syncEngine` (`src/lib/syncEngine.ts`)
* Escuta o evento `online` do navegador (`initAutoSync`).
* Lê os itens pendentes do `syncQueue` ordenados por `createdAt`.
* Converte campos de *camelCase* (cliente) para *snake_case* (Supabase).
* Executa a operação `upsert` no Supabase com chave primária de conflito.
* Em caso de sucesso, remove o item da fila local (`db.syncQueue.delete(id)`).

---

## 4. Schemas de Banco de Dados

### 4.1 Schema Local — Dexie IndexedDB (`src/db/dexieDb.ts`)
```typescript
attendances: '++id, studentId, [classId+date], synced'
syncQueue:   '++id, table, createdAt'
studentLogs: '++id, studentId, classId, category, createdAt'
grades:      '++id, studentId, classId, subject, updatedAt'
```
