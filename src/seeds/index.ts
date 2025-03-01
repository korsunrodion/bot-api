import "reflect-metadata";
import { AvailableTaskSeeder } from "../seeds/AvailableTask.seeder"
import { AppDataSource } from "../data-source";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Running seeds...");
    
    const earthquakeSeeder = new AvailableTaskSeeder();
    await earthquakeSeeder.run(AppDataSource);
    
    console.log("Seeds executed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

main();