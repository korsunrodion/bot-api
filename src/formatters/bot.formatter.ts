import { Bot } from "../entities/Bot.entity";

enum TaskLabel {
  processInvoice = 'Process invoice',
  categorizeTransactions = 'Categorize transactions',
  extractStatementData = 'Extract statement data',
  amortizeLoanPayments = 'Amortize loan payments',
  depreciateFixedAssets = 'Depreciate fixed assets',
  calculatePayrollAllocations = 'Calculate payroll allocations',
  generateMonthEndReport = 'Generate month end report',
  auditForDiscrepancies = 'Audit for discrepancies',
  closeTheBooks = 'Close the books',
  performReconciliation = 'Perform reconciliation'
}

export const formatToBot = (bot: Bot) => {
  return {
    id: bot.id,
    createdAt: bot.createdAt,
    updatedAt: bot.updatedAt,
    name: bot.name,
    tasks: bot.tasks.map((item) => ({
      id: item.id,
      createdAt: bot.createdAt,
      updatedAt: bot.updatedAt,
      status: item.status,
      // @ts-expect-error
      name: TaskLabel[item.availableTask.id]
    }))
  }
}
