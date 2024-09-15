const {createApp} = Vue;

createApp({
    data() {
        return {
            Ending: false,
            hero: {
                life: 150,
                maxLife: 150,
                Percentil: 100,
                name: "Hunter", 
                blocking: false,
                magicMode : false, //: para receber em formato json
            },
            villain: {
                life: 200,
                maxLife: 200,
                Percentil: 100,
                name: "Villain",
                blocking: false,
                magicMode : false, //: para receber em formato json
            },
        }
    },
    methods: {
        attack(isHero) {
            if (isHero) {
                if (this.villain.blocking){
                    console.log("Fraco")
                    this.villain.blocking = false    
                }
                else{
                    let dano = this.GenerateRNG(20) //criar uma variavel que esta recebendo o valor gerado
                    this.villain.life = this.villain.life - dano //comando para acessar variavel do vilao
                    this.villain.Percentil = ((this.villain.life / this.villain.maxLife)* 100) 
                    if (this.villain.life < 0){
                        this.villain.life = 0
                        this.TerminarJogo()
                    } 
                }
                this.villainAction()
            }
            else {
                if (this.hero.blocking){
                    console.log("No damage") 
                    this.hero.blocking = false 
                }
                else{
                    let dano = this.GenerateRNG(15) 
                    this.hero.life = this.hero.life - dano
                    this.hero.Percentil = ((this.hero.life / this.hero.maxLife)* 100)
                    if (this.hero.life < 0){
                        this.hero.life = 0
                        this.TerminarJogo()
                    }
                }
            }
        },
        Block(isHero) {
            if(isHero){
                this.hero.blocking = true
                console.log("Tente novamente")
                this.villainAction()
            }
            else{
                this.villain.blocking = true
                console.log("EU SOU INVENCIVEL")
            }

        },
        usePotion(isHero) {
            if(isHero){
                this.hero.life = this.hero.life + this.GenerateRNG(20) 
                if(this.hero.life > this.hero.maxLife){
                    this.hero.life = this.hero.maxLife
                    }
            
                this.CalcPercentilVilao()
                this.villainAction()
                console.log("REVIROGADO")
            }
            else{
                this.villain.life = this.villain.life + this.GenerateRNG(30)
                if(this.villain.life > this.villain.maxLife){
                    this.villain.life = this.villain.maxLife
                    }
                this.CalcPercentilHeroi()
                console.log("eu sou IMORTAL")
            }

        },
        Magic(isHero){
            if(isHero){
                this.hero.magicMode = true

                
            }
            else{
                this.villain.magicMode = true


            }

        },
        GenerateRNG(maxDmg){
            return Math.floor(Math.random() * maxDmg)
        },
        Ceifar(isHero){
            if(isHero){
                this.villain.blocking = false
                let dano = this.GenerateRNG(60) //criar uma variavel que esta recebendo o valor gerado
                this.villain.life = this.villain.life - dano //comando para acessar variavel do vilao
                this.CalcPercentilVilao
                if (this.villain.life < 0){
                    this.villain.life = 0
                    this.TerminarJogo() 
                }
                this.villainAction()
            }
            else{
                this.hero.blocking = false
                let dano = this.GenerateRNG(60) //criar uma variavel que esta recebendo o valor gerado
                this.hero.life = this.hero.life - dano //comando para acessar variavel do vilao
                this.CalcPercentilHeroi
                if (this.hero.life < 0){
                    this.hero.life = 0
                    this.TerminarJogo() 
                }
            }
        },
        Drenar(isHero){
            if(isHero){
                this.villain.blocking = false
                let dano = this.GenerateRNG(20)
                this.villain.life = this.villain.life - dano
                this.CalcPercentilVilao
                if(this.villain.life < 0){
                    this.villain.life = 0
                    this.TerminarJogo()
                }
                this.hero.life = this.hero.life + dano
                if(this.hero.life > this.hero.maxLife){
                    this.hero.life = this.hero.maxLife
                    }
                this.villainAction()
            }
            else{
                this.hero.blocking = false
                let dano = this.GenerateRNG(20)
                this.hero.life = this.hero.life - dano
                this.CalcPercentilHeroi
                if(this.hero.life < 0){
                    this.hero.life = 0
                    this.TerminarJogo()
                }
                this.villain.life = this.villain.life + dano
                if(this.villain.life > this.villain.maxLife){
                    this.villain.life = this.villain.maxLife
                    }
            }
        },

        Ultimate(){
            this.villain.blocking = false
            let dano = [0,200] 
            this.villain.life = this.villain.life - dano[this.GenerateRNG(dano.length)]
            this.CalcPercentilVilao
            if(this.villain.life < 0){
                this.villain.life = 0
                this.TerminarJogo()
            }
            this.Sair()
            this.villainAction()
        },

        Sair(isHero){
            if(isHero){
                this.hero.magicMode = false
            }
            else{
                this.villain.magicMode = false
            }
            


        },


        villainAction() {
            let actions = ['attack', 'Block', 'usePotion', 'Magic'];
            if (this.villain.magicMode == true){
                actions = ['Ceifar', 'Drenar', "Sair"]
                console.log("Modo magico")
            }
            const randomAction = actions[this.GenerateRNG(actions.length)];
            this[randomAction](false);
        },

        Refresh(){
            window.location.reload(true)
        },
        TerminarJogo(){
            this.Ending=true
        },
        CalcPercentilVilao(){
            this.villain.Percentil = ((this.villain.life / this.villain.maxLife)* 100)
        },
        CalcPercentilHeroi(){
            this.villain.Percentil = ((this.villain.life / this.villain.maxLife)* 100)
        },

    }
}).mount("#app")