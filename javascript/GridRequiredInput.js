/*******************************************************************************
 * Contents: The GridRequiredInput class.
 * Author: Dawid Blom.
 * Date: March 11, 2023.
 * 
 * NOTE: This class is the main class to handle user input. Additionally, all 
 * the other classes in this website hierarchy rely on this class. Most of them
 * are constructed based on the information that comes from this class. What I
 * mean is, if this class changes to much, it could break the whole setup. 
 * Making it the dirtiest class in the logic that handles the websites infor-
 * mation
 * 
 * I need to time to figure this out and find a way to decouple the other
 * classes from this one.
 ******************************************************************************/
class GridRequiredInput {
  #totalServices;
  #executionTimes;
  #releasePeriods;

  constructor() {
    this.#executionTimes = new Array();
    this.#releasePeriods = new Array();
  }

  HandleInput(userInput) {
    let validateInput = true; 
    if (userInput.includes(',') == false) {
        validateInput = false;
    }
    else if (this.#ParseInput(userInput) == false) {
        validateInput = false;
    }

    return validateInput;
  }

  GetTotalNumberOfServices() {
    return this.#totalServices;
  }

  GetReleasePeriods() {
    return this.#releasePeriods;
  }

  GetExecutionTimes() {
    return this.#executionTimes;
  }

  GetGridDimensions() {
    const gridDimensions = {rows:this.#totalServices, columns:this.#GetLcm()};
    return gridDimensions;
  }

  #ParseInput(userInput) {
    let validateParse = true;
    const tempList = userInput.split(',');
    this.#totalServices = parseInt(tempList.length);

    for (let i = 0; i < tempList.length; i++) {
    const fractionParts = tempList[i].split('/');
    const executionTime = parseInt(fractionParts[0]);
    const releasePeriods = parseInt(fractionParts[1]);
        if (this.#ValidateInput(executionTime, releasePeriods) == false) {
            validateParse = false;
            break;
        }
        else {
            this.#executionTimes.push(executionTime);
            this.#releasePeriods.push(releasePeriods);
        }
    }

    return validateParse;
  }

  #ValidateInput(executionTimes, releasePeriods) {
    let validateInput = true;
    if (((executionTimes >= releasePeriods) || isNaN(executionTimes) || isNaN(releasePeriods))) {
        validateInput = false;
    }

    return validateInput;
  }
  
  #GetLcm() {
      var lcm = this.#releasePeriods[0];
      for (var i = 1; i < this.#releasePeriods.length; i++) {
          lcm = (((this.#releasePeriods[i] * lcm)) / (this.#GetGcd(this.#releasePeriods[i], lcm)));
      }

      return lcm;
  }

  #GetGcd(firstNumber, secondNumber) {
      let gcd = firstNumber;
      if (secondNumber == 0) {
          gcd = firstNumber;
      }
      else {
          gcd = this.#GetGcd(secondNumber, firstNumber % secondNumber);
      }
      
      return gcd;
  }
}