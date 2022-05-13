class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
        ];
    };

    // iniciar a validação de todos os campos
    validate(form) {
        // pegando os inputs do form
        const inputs = form.getElementsByTagName('input');

        //transformando o HTMLCollection -> array (tabela de dados)
        const inputsArray = [...inputs];

        //loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {

            //loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null) {
                
                    // transformando data-min-length -> minlength
                    //impando a string para gerar um novo método (minlenght)
                    const method = this.validations[i].replace('data-', '').replace('-', '');

                    //pegar o valor do input 
                    const value = input.getAttribute(this.validations[i]);

                    //invocar o método method
                    this[method](input, value);
                };
            };
        
        },this);


    };
    //verifica se o input tem um número minimo de caracteres
    minlength(input, minValue) {
        const inputLength = input.value.length;
        const errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
           // this.printMessage(input, errorMessage);
           this.printMessage(input, errorMessage);
        };
        
    };
    // metodo para imprimir imagem de erro na tela
    printMessage(input, msg) {
        
        const template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        const inputParent = input.parentNode;

        template.classList.remove('errorValidation');

        inputParent.appendChild(errorValidation);

    }
};

const form =  document.getElementById("register-form");
const submit = document.getElementById("btn-submit");

const validator = new Validator();

// evento de que dispara as validações

submit.addEventListener('click', function(e) {

    e.preventDefault();

    validator.validate(form);
});