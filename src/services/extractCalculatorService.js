import { selectEntradas, selectSaidas } from "../repositories/transactionsRepository.js"

async function extractCalculatorService(usuario_id) {
    const saidas = await selectSaidas(usuario_id);
    const entradas = await selectEntradas(usuario_id);
    let calculosaidas = 0;
    let calculoentradas = 0;
    for (let s of saidas) {
        calculosaidas += s.valor;
    }
    for (let e of entradas) {
        calculoentradas += e.valor;
    }
    return {
        entrada: calculoentradas, saida: calculosaidas
    }
}
export { extractCalculatorService }