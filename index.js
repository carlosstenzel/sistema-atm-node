const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const maxSaque = 1001;

function ErroDados() {
  console.log("ERROR - Por favor digite apenas numeros de 1 a 1000");
}

function MostraCedulas(conta) {
  console.log(
    `\nNotas entregues:\n 
    ${conta[0]} notas de R$200,00, 
    ${conta[1]} notas de R$100,00, 
    ${conta[2]} notas de R$50,00,
    ${conta[3]} notas de R$20,00,
    ${conta[4]} notas de R$10,00,
    ${conta[5]} notas de R$5,00
    ${conta[6]} notas de R$2,00`
  );
}
function isPositiveInteger(n) {
  return n >>> 0 === parseFloat(n);
}

function Saque(valor) {
  if (!isPositiveInteger(valor)) {
    ErroDados();
    Init();
  } else {
    valor = parseInt(valor);

    if (valor > maxSaque) {
      ErroDados();
      Init();
    } else {
      console.log(`\nIniciando saque no valor de R$ ${valor}`);

      let total = valor;

      const notas = [200, 100, 50, 20, 10, 5, 2];

      let conta = [0, 0, 0, 0, 0, 0, 0];

      for (var indice = 0; indice < 7; indice++) {
        if (total >= notas[indice]) {
          conta[indice] = parseInt(total / notas[indice]);
          total = total - notas[indice] * conta[indice];
        }

        if (total === 0) {
          break;
        } else if (total < 2) {
          total = valor;
          conta = [0, 0, 0, 0, 0, 0, 0];

          for (var indice = 6; indice > 0; indice--) {
            if (total >= notas[indice]) {
              conta[indice] = parseInt(total / notas[indice]);
              total = total - notas[indice] * conta[indice];
            }

            if (total < 2) break;
          }
        }
      }

      if (total === 1 || total === 3) {
        totalrest = total;
        total = valor;
        conta = [0, 0, 0, 0, 0, 0, 0];

        for (var indice = 0; indice < 7; indice++) {
          if (total > notas[indice]) {
            prev = parseInt(total / notas[indice]);
            totalprev = total - notas[indice] * prev;

            if (totalprev === 1 || totalprev === 3) {
              prev = total / 3;
              if (isPositiveInteger(prev) && prev > 1) {
                conta[indice + 1] = parseInt(total / notas[indice + 1]);
                total = total - notas[indice + 1] * conta[indice + 1];
              } else {
                prev = total - notas[indice];

                if (isPositiveInteger(prev) && prev > 1 && prev !== 3) {
                  conta[indice] = 1;
                  total = total - notas[indice];
                } else {
                }
              }
            } else {
              conta[indice] = parseInt(total / notas[indice]);
              total = total - notas[indice] * conta[indice];
            }
          }

          if (total === 1) {
            break;
          }
        }

        if (total > 0) {
          console.log(
            "\nNão conseguimos devolver este valor já que não existe nota de R$1,00"
          );
          console.log("\nPor favor tente novamente");
          Init();
        } else {
          MostraCedulas(conta);

          rl.close();
        }
      } else {
        MostraCedulas(conta);

        rl.close();
      }
    }
  }
}

function Init() {
  rl.question("\nQual valor deseja sacar ? ", function (valor) {
    Saque(valor);
  });
}

console.log("\nStart Atm ....");

Init();

rl.on("close", function () {
  console.log("\nFinalizando Atendimento");
  process.exit(0);
});
