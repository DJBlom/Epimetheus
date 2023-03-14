/*******************************************************************************
 * Contents: The ServiceGrid class.
 * Author: Dawid Blom.
 * Date: March 13, 2023.
 * 
 * NOTE: This class builds and displays the service grid that illustrates how
 * services will be executed.
 ******************************************************************************/
class ServicesGrid {
  #releasePeriods;
  #isOccupied;
  #schedule;
  #grid;
  #isReleasePeriod;
  

  constructor(gridRequiredInput) {
    this.#releasePeriods = gridRequiredInput.GetReleasePeriods();
    this.#grid = gridRequiredInput.GetGridDimensions();

    this.#isOccupied = 1;
    this.#isReleasePeriod = 0;
  }

  DisplayGrid(servicesElement) {
    const tableBody = document.createElement("tbody");

    for (let row = 0; row < this.#grid.rows; row++) {
      const service = document.createElement("tr");
      const serviceData = document.createElement("td"); 
      const serviceInfo = document.createTextNode(`CPU_Service${row + 1}:`);
      serviceData.appendChild(serviceInfo);
      serviceData.classList.add("grid");
      service.appendChild(serviceData);
      var executionPeriod = document.createElement("td"); 
      
      for (let columns = 1; columns <= this.#grid.columns; columns++) {
        executionPeriod = document.createElement("td"); 
        if ((columns % this.#releasePeriods[row]) == this.#isReleasePeriod) {
          executionPeriod.classList.add("releasePeriods");
          service.appendChild(executionPeriod);
        }
        else {
          executionPeriod.classList.add("services");
          service.appendChild(executionPeriod);
        }

        if (this.#schedule[row][columns - 1] == this.#isOccupied) {
          executionPeriod.classList.add("execution");
          service.appendChild(executionPeriod);
        }
      }
      
      tableBody.appendChild(service);
    }
    
    servicesElement.append(tableBody);
  }


  ScheduleServices(scheduler) {
    scheduler.CreateFifoSchedule();
    this.#schedule = scheduler.GetFifoSchedule();
  }
}