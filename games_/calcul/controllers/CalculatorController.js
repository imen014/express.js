class CalculatorController{

    constructor(number1, number2, operation){
        this.number1 = number1;
        this.number2 = number2;
        this.operation= operation;
    }

    calculate() {
        let result;

        switch(operation){
          case 'add':
                result = this.number1 + this.number2;
                break;
            case 'substract':
                return this.number1 - this.number2;            break;
            case 'multiply':
                return this.number1 * this.number2;
                break;
              case 'divide':
                return this.number1 / this.number2;
                break;
            default:
                return "verify operation !";
    
      
        }
        
    }

}

module.exports = CalculatorController;