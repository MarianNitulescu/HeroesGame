class Hero {
    constructor(name,hp){
        this.name = name;
        this.hp = hp;
        this.canFly = false;
        this.shield = false;
    }
    attacked(damage){
        if(this.canFly){
            let chance = Math.random();
            if(chance > 0.5){
                console.log(this.name + " flew away");
                damage = 0;
            }
        }
        if(this.shield){
            damage *= 0.8;
            console.log(this.name + " defends with a shield");
        }
        this.hp -= damage;
        console.log(this.name + " has been attacked. hp reduced by " + damage + ". hp remaining: " + this.hp + ".");
    }
}
class Dwarf extends Hero{
    constructor(name, hp){
        super(name, hp);
        this.shield = true;
    }
    attack(otherHero){
        let damage = 10;
        console.log(this.name + " attacked with damage: " +  damage + ".");
        otherHero.attacked(damage);
    }
}
class Sprite extends Hero{
    constructor(name, hp){
        super(name, hp);
        this.canFly = true;
    }
    attack(otherHero){
        let damage = 15;
        console.log(this.name + " attacked with damage: " + damage + ".");
        otherHero.attacked(damage);
    }
}
class Dragon extends Hero{
    constructor(name, hp){
        super(name, hp);
        this.shield = true;
        this.canFly = true;
    }
    attack(otherHero){
        let damage = 5;
        console.log(this.name + " attacked with damage: " + damage + ".");
        otherHero.attacked(damage);
    }
}
class Fight{
    constructor(hero1, hero2){
        this.hero1 = hero1;
        this.hero2 = hero2;
        this.turn = 0;
    }
    performAttack(){
        if(this.turn === 0){
            this.hero1.attack(this.hero2);
        } else {
            this.hero2.attack(this.hero1);
        }
    }
    changeTurn(){
        this.turn = 1 - this.turn;
    }
    findWinner(){
        let winner = '';
        if(this.hero1.hp > 0){
            winner = this.hero1.name + " won with: " + this.hero1.hp + ".";
            console.log(winner);
            return winner;
        } else if(this.hero2.hp > 0){
            winner = this.hero2.name + " won with: " + this.hero2.hp + ".";
            console.log(winner);
            return winner;
        } else{
            winner = "No hero left alive."
            console.log(winner);
            return winner;
        }
    }
    go(){
        do{
            this.performAttack();
            this.changeTurn();
        } while(this.hero1.hp > 0 && this.hero2.hp > 0);
        this.findWinner();
    }
}
let dwarf = new Dwarf("Ciri, Princess of Cintria", 50);
let sprite = new Sprite("Ariel the newest Dwarf", 40);
let dragon = new Dragon('Drogon ', 60);
let epicFight = new Fight(sprite, dwarf);
epicFight.go();

let showWinner = document.querySelector('#show-winner');
showWinner.innerHTML = epicFight.findWinner();