/*******************************************************************************
 * Contents: The SystemFeasibility class.
 * Author: Dawid Blom.
 * Date: March 5, 2023.
 * 
 * NOTE: This class checks the systems feasbility based on the rate monotonic
 * least upper bound manthematical equation. Therefore, a system might not be
 * feasible yet the scheduling of services do not clash. But it will never show
 * that a system is feasible when it's not.  
 ******************************************************************************/
class SystemFeasibility {
    #totalServices;
    #releasePeriods;
    #executionTimes;

    constructor (gridRequiredInput) {
        this.#totalServices = gridRequiredInput.GetTotalNumberOfServices();
        this.#releasePeriods = gridRequiredInput.GetReleasePeriods();
        this.#executionTimes = gridRequiredInput.GetExecutionTimes();
    }

    DisplayResults(resultsElement) {
        const list = document.createElement("li");
        list.classList.add("grid-container")

        const utilityItem = document.createElement("li");
        const utilityNode = document.createTextNode("Utility: " + this.#ComputeUtility() + "%");
        utilityItem.classList.add("displayResults");
        utilityItem.appendChild(utilityNode);
        
        
        const rmLubItem = document.createElement('li');
        const rmLubNode = document.createTextNode("Rate Monotonic Least Upper Bound: " + this.#ComputeRmLub() + "%");
        rmLubItem.classList.add("displayResults");
        rmLubItem.appendChild(rmLubNode);
        
        const slackTimeItem = document.createElement('li');
        let slackTimeNode = document.createTextNode("Slack Time: " + this.#ComputeSlackTime() + "%");
        slackTimeItem.classList.add("displayResults");
        slackTimeItem.appendChild(slackTimeNode);

        const feasibilityItem = document.createElement('li');
        let feasibilityNode;
        if (this.#SystemIsFeasible() == true) {
            feasibilityNode = document.createTextNode("System Feasibility: PASSED");
        }
        else {
            feasibilityNode = document.createTextNode("System Feasibility: FAILED");
        }
        feasibilityItem.classList.add("displayResults");
        feasibilityItem.appendChild(feasibilityNode);


        list.appendChild(feasibilityItem);
        list.appendChild(utilityItem);
        list.appendChild(rmLubItem);
        list.appendChild(slackTimeItem);
        
        resultsElement.append(list);
    }

    #SystemIsFeasible() {
        let isFeasible = false;
        const rmLub = this.#ComputeRmLub();
        const utility = this.#ComputeUtility();
        const feasibility = (rmLub - utility);
        const lowerBound = 0;
        
        if ((feasibility > lowerBound)) {
            isFeasible = true;
        }

        return isFeasible;
    }

    #ComputeSlackTime() {
        const rmLub = this.#ComputeRmLub();
        const utility = this.#ComputeUtility();
        const slackTime = (rmLub - utility);
        return slackTime.toFixed(2);
    }

    #ComputeUtility() {
        let newUtility = 0;

        for (var i = 0; i < this.#totalServices; i++) {
            newUtility = newUtility + (this.#executionTimes[i] / this.#releasePeriods[i]);
        } 

        newUtility = newUtility * 100;

        return newUtility.toFixed(2);
    }

    #ComputeRmLub() {
        let newRmLub = this.#totalServices * (2**(1 / this.#totalServices) - 1);

        return newRmLub.toFixed(4) * 100;
    }
}