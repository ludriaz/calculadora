// Objeto Operacion: Define la estructura de una operación, con un número (num1) y un operador
function Operacion(num1, operador) {
    this.num1 = num1; 
    this.operador = operador; 
}

// Usar prototype para definir num2
Operacion.prototype.num2 = 0; 

// Método que realiza la operación según el operador
Operacion.prototype.realizarOperacion = function () {
    // Dependiendo del operador, se realiza la operación correspondiente
    switch (this.operador) {
        case '+':
            return sumar(this.num1, this.num2); // Sumar los números
        case '-':
            return restar(this.num1, this.num2); // Restar los números
        case '*':
            return multiplicar(this.num1, this.num2); // Multiplicar los números
        case '/':
            return dividir(this.num1, this.num2); // Dividir los números
        case '√': 
            return raizCuadrada(this.num1); // Calcular la raíz cuadrada del primer número
        default:
            manejarError(); // Llamar a la función de manejo de error si el operador no es válido
            return null; // Retorna null si el operador no es válido
    }
};

// Método toString para convertir la operación a una cadena legible
Operacion.prototype.toString = function () {
    // Si el operador es raíz cuadrada, solo muestra el primer número
    if (this.operador === '√') {
        return `√${this.num1} = ${this.realizarOperacion()}`;
    }
    // Si el operador no es raíz cuadrada, muestra ambos números y el resultado
    return `${this.num1} ${this.operador} ${this.num2} = ${this.realizarOperacion()}`;
};

// Funciones para cada operación matemática
// Función para calcular la suma
function sumar(a, b) {
    return a + b; 
}

// Función para calcular la resta
function restar(a, b) {
    return a - b; 
}

// Función para calcular la multiplicación
function multiplicar(a, b) {
    return a * b; 
}

// Función para calcular la división
function dividir(a, b) {
    if (b === 0) {
        // Si el divisor es cero, muestra un mensaje de error
        console.log("Error: División por cero no permitida. Operación no válida.");
        manejarError(); // Llamar a la función de manejo de error
        return null; // No se realiza la operación
    }
    // Realiza la división de los números
    return a / b; 
}

// Función para calcular la raíz cuadrada
function raizCuadrada(a) {
    if (a < 0) {
        // Si el número es negativo, no se puede calcular la raíz cuadrada
        console.log("Error: No se puede calcular la raíz cuadrada de un número negativo. Operación no válida.");
        manejarError(); // Llamar a la función de manejo de error
        return null; // No se realiza la operación
    }
    return Math.sqrt(a); // Calcula la raíz cuadrada de un número
}

// Función para manejar errores y mostrar un mensaje específico en la consola
function manejarError() {
    console.log("Opción no válida. Operación no realizada."); // Mensaje de error genérico
}

// Historial de operaciones
let historial = []; // Inicializa el historial de operaciones realizadas

// Función para mostrar el menú de la calculadora
function calculadora() {
    let operacion;
    alert("Recuerda que debes refrescar la aplicación para un uso adecuado la primera vez");

    do {
        // Muestra un menú para seleccionar la operación que se desea realizar
        operacion = prompt(
            'Seleccione una operación:\n1. Suma\n2. Resta\n3. Multiplicación\n4. División\n5. Raíz Cuadrada\n6. Ver Historial\n7. Salir'
        );

        // Se asigna el operador según la opción seleccionada
        switch (operacion) {
            case '1':
                operador = '+'; // Suma
                break;
            case '2':
                operador = '-'; // Resta
                break;
            case '3':
                operador = '*'; // Multiplicación
                break;
            case '4':
                operador = '/'; // División
                break;
            case '5':
                // Si elige raíz cuadrada, pide solo un número
                let numero = validarInput(); // Llamamos a validarInput sin mensaje
                let nuevaOperacionRaiz = new Operacion(numero, '√');

                // Solo agregar al historial si no hay un error
                let resultadoRaiz = nuevaOperacionRaiz.realizarOperacion();
                if (resultadoRaiz !== null) {
                    historial.push(nuevaOperacionRaiz); // Agregar la operación al historial
                    console.log(`Resultado: ${resultadoRaiz}`); // Mostrar el resultado
                }
                break;

            case '6':
                // Si elige ver el historial, muestra todas las operaciones validas realizadas
                console.log('Historial de operaciones:');
                if (historial.length === 0) {
                    console.log('No hay operaciones en el historial.');
                } else {
                    historial.forEach((operacion, index) => {
                        console.log(`${index + 1}. ${operacion.toString()}`); // Muestra cada operación en el historial
                    });
                }
                break;

            case '7':
                console.log('Saliendo de la calculadora...'); // Mensaje al salir
                break;

            default:
                console.log('Opción no válida. Intente de nuevo.'); // Mensaje de error si la opción no es válida
                break;
        }

        // Si la operación es suma, resta, multiplicación o división, se piden dos números
        if (operacion === '1' || operacion === '2' || operacion === '3' || operacion === '4') {
            let num1 = validarInput(); // Llamamos a validarInput para obtener el primer número
            let num2 = validarInput(); // Llamamos a validarInput para obtener el segundo número
            let nuevaOperacion = new Operacion(num1, operador); // Creamos una nueva operación con los números y el operador
            nuevaOperacion.num2 = num2; // Asignamos el segundo número a la operación

            // Solo agregar al historial si no hay un error
            let resultado = nuevaOperacion.realizarOperacion();
            if (resultado !== null) {
                historial.push(nuevaOperacion); // Agregar la operación al historial
                console.log(`Resultado: ${resultado}`); // Mostrar el resultado
            }
        }

    } while (operacion !== '7'); // El ciclo se repite hasta que elija salir
}

// Función para obtener un número válido del usuario
function validarInput() {
    let numero;
    do {
        // Pedimos al usuario que ingrese un número
        numero = parseFloat(prompt('Ingrese un número:')); // Mensaje fijo sin parámetro
        if (isNaN(numero)) {
            console.log('Entrada no válida. Por favor, ingrese un número.'); // Mensaje de error si la entrada no es válida
        }
    } while (isNaN(numero)); // Repite hasta que se ingrese un número válido
    return numero; // Retorna el número válido ingresado
}

// Llamamos a la función para iniciar la calculadora
calculadora(); 

