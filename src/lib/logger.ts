import { LogEntry, LogLevel } from '../types';

class Logger {
  private logHistory: LogEntry[] = [];
  private maxHistorySize = 100;

  private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString();
    const ctx = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [EDUCAFLOW-${level.toUpperCase()}] ${message}${ctx}`;
  }

  private addEntry(level: LogLevel, message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };
    this.logHistory.unshift(entry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.pop();
    }
  }

  public debug(message: string, context?: Record<string, unknown>) {
    this.addEntry('debug', message, context);
    console.debug(this.formatMessage('debug', message, context));
  }

  public info(message: string, context?: Record<string, unknown>) {
    this.addEntry('info', message, context);
    console.info(this.formatMessage('info', message, context));
  }

  public warn(message: string, context?: Record<string, unknown>) {
    this.addEntry('warn', message, context);
    console.warn(this.formatMessage('warn', message, context));
  }

  public error(message: string, context?: Record<string, unknown>) {
    this.addEntry('error', message, context);
    console.error(this.formatMessage('error', message, context));
  }

  public getHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  public clearHistory() {
    this.logHistory = [];
  }
}

export const logger = new Logger();
