/*******************************************************************************
 * Contents: The FifoScheduler class.
 * Author: Dawid Blom.
 * Date: March 9, 2023.
 * 
 * NOTE: This class is the algorithm used to construct real time services that
 * will be executed in a fifo manner. It creates the fifo scheduler in a two-D
 * array and returns it to ServicesGrid for displaying purposes.
 * 
 * The main algorithm is `CreateFifoSchedule`, all the other methods are there
 * to increase readability.
 ******************************************************************************/
class FifoScheduler {
  #releasePeriods;
  #executionTimes;
  #grid;
  #occupiedColumns;
  #schedule;
  #nextReleasePeriodCount;

  constructor(gridRequiredInput) {
    this.#releasePeriods = gridRequiredInput.GetReleasePeriods();
    this.#executionTimes = gridRequiredInput.GetExecutionTimes();
    this.#grid = gridRequiredInput.GetGridDimensions();

    this.#CreateColumnsToOccupy();
    this.#CreateSchedule();

    this.#nextReleasePeriodCount = 2;
  }

  GetFifoSchedule() {
    return this.#schedule;
  }

  CreateFifoSchedule() {
    let executionPeriod = 0;
    let releasePeriodEnd  = 0;

    for (let serviceIndex = 0; serviceIndex < this.#grid.rows; serviceIndex++) {
      for (let releaseIndex = 0; releaseIndex <= this.#grid.columns; releaseIndex++) {

        if (this.#StartOfReleasePeriod(releaseIndex, serviceIndex)) {
          executionPeriod = this.#GetTheNextExecutionPeriod(serviceIndex);
          releasePeriodEnd = this.#GetTheNextReleasePeriod(serviceIndex);

          for (let executionIndex = releaseIndex; executionIndex <= releasePeriodEnd; executionIndex++) {

            if (this.#CurrentColumnIsNotOccupied(executionIndex, executionPeriod)) {
              this.#OccupyColumn(executionIndex);
              this.#PopulateSchedule(serviceIndex, executionIndex);
              executionPeriod--;
            }
          }
        }
      }
    }
  }

  #CreateColumnsToOccupy() {
    this.#occupiedColumns = new Array(this.#grid.columns);

    for (let i = 0; i <= this.#grid.columns; i++) {
      this.#occupiedColumns[i] = 0;
    }
  }

  #CreateSchedule() {
    this.#schedule = new Array(this.#grid.rows);

    for (let i = 0; i < this.#grid.rows; i++) {
      this.#schedule[i] = new Array(this.#grid.columns).fill(0);
    }
  }

  #StartOfReleasePeriod(releaseIndex, index) {
    return ((releaseIndex % this.#releasePeriods[index]) == 0);
  }

  #CurrentColumnIsNotOccupied(index, executionPeriod) {
    return ((this.#occupiedColumns[index] == 0) && (executionPeriod != 0));
  }

  #GetTheNextReleasePeriod(index) {
    return (this.#releasePeriods[index] * this.#nextReleasePeriodCount++);
  }

  #GetTheNextExecutionPeriod(index) {
    return this.#executionTimes[index];
  }

  #OccupyColumn(index) {
    const value = 1;
    this.#occupiedColumns[index] = value;
  }

  #PopulateSchedule(serviceIndex, executeIndex) {
    const value = 1;
    this.#schedule[serviceIndex][executeIndex] = value;
  }
}