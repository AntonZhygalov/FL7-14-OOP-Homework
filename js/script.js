function Casino(numberOfSlotMachine, initialAmountOfMoneyCasino) {
    this._casinoMoney = initialAmountOfMoneyCasino;
    this._machine = [];

    if (numberOfSlotMachine <= 0 || isNaN(numberOfSlotMachine) || initialAmountOfMoneyCasino < 0 || isNaN(initialAmountOfMoneyCasino)) {
        console.log('Incorrect Input');
    } else {
        var restOfMoney = initialAmountOfMoneyCasino % numberOfSlotMachine;
        for (var i = 0; i < numberOfSlotMachine; i++) {
            this._machine[i] = new SlotMachine(Math.floor(initialAmountOfMoneyCasino / numberOfSlotMachine));
        }
        this._machine[0].lucky = 1;
        this._machine[0]._initialAmountOfMoneyMachine += restOfMoney;
    }

    this.getTotalAmountOfMoney = function() {
        if (this._machine.length === 0) {
            return this._casinoMoney;
        } else {
            var totalAmount = 0;
            for (var i = 0; i < this._machine.length; i++) {
                totalAmount += this._machine[i]._initialAmountOfMoneyMachine;
            }
            return totalAmount;
        }
    }

    this.getTotalNumberOfMachines = function() {
        return this._machine.length;
    }

    this.addNewSlotMachine = function() {
        if (this._machine.length === 0) {
            this._machine.push(new SlotMachine(this._casinoMoney));
            this._machine[0].lucky = 1;
        } else {
            var money = this._machine[0]._initialAmountOfMoneyMachine;
            var machineNumber = 0;
            for (var i = 0; i < this._machine.length; i++) {
                if (money <= this._machine[i]._initialAmountOfMoneyMachine) {
                    money = this._machine[i]._initialAmountOfMoneyMachine;
                    machineNumber = i;
                }
            }
            this._machine[machineNumber]._initialAmountOfMoneyMachine = Math.floor(money / 2) + (money % 2);
            this._machine.push(new SlotMachine(Math.floor(money / 2)));
        }
    }

    this.removeMachine = function(id) {
        if (this._machine.length === 0) {
            console.log('No Machines left to remove');
        } else if (this._machine.length === 1) {
            this._casinoMoney = this._machine[0]._initialAmountOfMoneyMachine;
            this._machine.splice(id, 1);
        } else if (id >= this._machine.length || isNaN(id) || id < 0) {
            console.log('Incorrect ID');
        } else {
            var removeMachineMoney = this._machine[id]._initialAmountOfMoneyMachine;
            this._machine.splice(id, 1);
            for (var i = 0; i < this._machine.length; i++) {
                this._machine[i]._initialAmountOfMoneyMachine += Math.floor(removeMachineMoney / this._machine.length);
            }
            this._machine[0]._initialAmountOfMoneyMachine += removeMachineMoney % this._machine.length;
            this._machine[0].lucky = 1;
        }
    }

    this.takeMoneyFromCasino = function(amount) {
        if (amount <= 0 || isNaN(amount)) {
            console.log('Incorrect value');
        } else if (this.getTotalAmountOfMoney() < amount) {
            console.log('Not enough money in Casino');
        } else {
            var debt = amount;
            while (debt != 0) {
                money = this._machine[0]._initialAmountOfMoneyMachine;
                machineNumber = 0;
                for (var i = 0; i < this._machine.length; i++) {
                    if (money <= this._machine[i]._initialAmountOfMoneyMachine) {
                        money = this._machine[i]._initialAmountOfMoneyMachine;
                        machineNumber = i;
                    }
                }
                if (money < debt) {
                    debt -= money;
                    this._machine[machineNumber]._initialAmountOfMoneyMachine = 0;
                } else {
                    this._machine[machineNumber]._initialAmountOfMoneyMachine -= debt;
                    debt = 0;
                    return this._machine;
                }
            }
        }
    }

}

function SlotMachine(initialAmountOfMoneyMachine) {
    this._initialAmountOfMoneyMachine = initialAmountOfMoneyMachine;

    if (initialAmountOfMoneyMachine < 0 || isNaN(initialAmountOfMoneyMachine)) {
        console.log('Incorrect Input');
    }

    this.getAmountMoneyInMachine = function() {
        return this._initialAmountOfMoneyMachine;
    }

    this.takeMoneyMachine = function(amount) {
        if (amount <= 0 || isNaN(amount)) {
            console.log('Incorrect value');
        } else if (this._initialAmountOfMoneyMachine < amount) {
            console.log('Not enough money in machine');
        } else {
            this._initialAmountOfMoneyMachine -= amount;
            return this;
        }
    }

    this.putMoneyMachine = function(amount) {
        if (amount <= 0 || isNaN(amount)) {
            console.log('Incorrect value');
        } else {
            this._initialAmountOfMoneyMachine += amount;
            return this;
        }
    }

    this.play = function(amount) {
        if (amount <= 0 || isNaN(amount)) {
            console.log('Incorrect value');
        } else if ((this._initialAmountOfMoneyMachine + amount) < (amount * 5)) {
            console.log('This machine does not accept such big sums of money, try smaller sums');
        } else {
            this._initialAmountOfMoneyMachine += amount;
            var win = 0;
            var digit1 = Math.round(Math.random() * 9);
            var digit2 = Math.round(Math.random() * 9);
            var digit3 = Math.round(Math.random() * 9);

            if (digit1 != digit2 && digit1 != digit3 && digit2 != digit3) {
                console.log(digit1 + '' + digit2 + '' + digit3);
                return win;
            } else if ((digit1 === digit2 || digit1 === digit3) && digit2 != digit3) {
                console.log(digit1 + '' + digit2 + '' + digit3);
                this._initialAmountOfMoneyMachine -= amount * 2;
                return win = amount * 2;
            } else if (digit2 === digit3 && digit1 != digit2) {
                console.log(digit1 + '' + digit2 + '' + digit3);
                this._initialAmountOfMoneyMachine -= amount * 2;
                return win = amount * 2;
            } else if (digit1 === digit2 && digit1 === digit3 && digit1 != 7) {
                console.log(digit1 + '' + digit2 + '' + digit3);
                this._initialAmountOfMoneyMachine -= amount * 5;
                return win = amount * 5;
            } else if (digit1 === 7 && digit2 === 7 && digit3 === 7 && this.hasOwnProperty('lucky')) {
                digit1 = 1;
                digit2 = 3;
                digit3 = 9;
                console.log(digit1 + '' + digit2 + '' + digit3);
                return win;
            } else {
                console.log(digit1 + '' + digit2 + '' + digit3);
                win = this._initialAmountOfMoneyMachine;
                this._initialAmountOfMoneyMachine = 0;
                return win;
            }

        }
    }



}

function demonstrate() {
    // create casino the first machine is lucky (id 0).
    var casino = new Casino(3, 10000);
    console.log(casino._machine);

    // shows total amount of money in Casino.
    console.log(casino.getTotalAmountOfMoney());

    // Shows how many machines there is.
    console.log(casino.getTotalNumberOfMachines());

    // adds new slot machine. It takes half the money ifrom the biggest machine but the rest stays in the biggest machine.
    // If there no machines adds 1 and makes it Lcuky.
    casino.addNewSlotMachine();
    console.log(casino._machine);

    // Removes Machine amount spreads equally among other machines but the rest goes to first machine(id 0).
    // If removed machine were lucky, then the next one with id 0 will be lucky.
    casino.removeMachine(0);
    console.log(casino._machine);

    // removes money from the biggest machine.
    console.log(casino.takeMoneyFromCasino(1000));
    console.log(casino.getTotalAmountOfMoney());

    // Gets total amount of money in machine.
    console.log(casino._machine[0].getAmountMoneyInMachine());

    // Takes money from machine
    casino._machine[0].takeMoneyMachine(1000);
    console.log(casino._machine[0].getAmountMoneyInMachine());

    // Puts Money in machine
    casino._machine[0].putMoneyMachine(10000);
    console.log(casino._machine[0].getAmountMoneyInMachine());

    // Play to win!!!! Return Shows digits and money that you win
    console.log(casino._machine[0].play(100));
}

// And here is what you asked Pony!!!!!!!!!!!!!!!!!
console.log('%c       ', 'font-size: 200px; background: url(https://derpicdn.net/img/2013/12/3/488623/thumb.gif) no-repeat;');

module.exports = {
    Casino: Casino,
    SlotMachine: SlotMachine,
    demonstrate: demonstrate
}

