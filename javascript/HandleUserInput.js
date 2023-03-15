/*******************************************************************************
 * Contents: The HandleUserInput function.
 * Author: Dawid Blom.
 * Date: March 12, 2023.
 * 
 * NOTE: This function is pretty much the start, the main function if you will.
 * It gets the information from the different areas of the HTML-DOM and provides
 * it to the GridRequiredInput for verifications and parsing, afterwhich it's 
 * distributed to the other classes.
 ******************************************************************************/
function HandleUserInput() {
  let gridIsHealthy = true;
  const resultsElement = document.querySelector('.rm-results');
  const servicesElement = document.querySelector(".serviceGrid");
  const userInput = document.getElementById("input-execution-services").value;

  resultsElement.replaceChildren();
  servicesElement.replaceChildren();


  const gridRequiredInput = new GridRequiredInput();
  if (gridRequiredInput.HandleInput(userInput) == false) {
    alert("Check Your Format or length.");
    gridIsHealthy = false;
  }
  else {
    const systemFeasibility = new SystemFeasibility(gridRequiredInput);
    systemFeasibility.DisplayResults(resultsElement); 

    const fifoScheduler = new FifoScheduler(gridRequiredInput);
    const servicesGrid = new ServicesGrid(gridRequiredInput);
    servicesGrid.ScheduleServices(fifoScheduler);
    servicesGrid.DisplayGrid(servicesElement);
  }

  return gridIsHealthy;
}




