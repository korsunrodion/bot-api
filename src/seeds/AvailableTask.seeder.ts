import { DataSource } from "typeorm"
import { Seeder } from "typeorm-extension"
import { AvailableTask } from "../entities/AvailableTask.entity";

const availableTasks = [
  {
    id: 'processInvoice',
    duration: 1500,
  }, 
  {
    id: 'categorizeTransactions',
    duration: 2750,
  }, 
  {
    id: 'extractStatementData',
    duration: 18000,
  }, 
  {
    id: 'amortizeLoanPayments',
    duration: 2573,
  }, 
  {
    id: 'depreciateFixedAssets',  
    duration: 7454,
  }, 
  {
    id: 'calculatePayrollAllocations',
    duration: 37473,
  }, 
  {
    id: 'generateMonthEndReport',
    duration: 34332,
  }, 
  {
    id: 'auditForDiscrepancies',
    duration: 6765,
  },
  {
    id: 'closeTheBooks',
    duration: 3643,
  },
  {
    id: 'performReconciliation',
    duration: 4542,
  }
];

export class AvailableTaskSeeder implements Seeder {
  async run(
    dataSource: DataSource,
  ): Promise<void> {
    const repository = dataSource.getRepository(AvailableTask);
    
    for (const item of availableTasks) {
      if (!(await repository.countBy({ id: item.id }))) {
        await repository.save(item);
      }
    }
  }
}