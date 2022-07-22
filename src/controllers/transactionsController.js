import express from "express";
import { deleteTransactions, insertTransactions, selectTransactionsAll, selectTransactionsById, updateTransactions } from "../repositories/transactionsRepository.js";
import { authenticationService } from "../services/authenticationService.js";
import { extractCalculatorService } from "../services/extractCalculatorService.js";
const Router = express.Router();

Router.get('/extract', authenticationService, async (req, res) => {
    const extracts = await extractCalculatorService(req.id);
    return res.status(200).json(extracts);
})


Router.get('/', authenticationService, async (req, res) => {
    const transactions = await selectTransactionsAll(req.id);
    return res.status(200).json({
        transactions
    })
})
Router.get('/:id', authenticationService, async (req, res) => {
    const transactions = await selectTransactionsById(req.id, req.params.id);
    if (transactions == undefined || transactions.length == 0) {
        return res.status(400).json({ mensagem: "Transação não encontrada." })

    }
    return res.status(200).json({
        transactions
    })
})
Router.post('/', authenticationService, async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body;
    const usuario_id = req.id;
    if ((tipo == undefined || tipo.trim() == '') && (descricao == undefined || descricao.trim() == '') && (valor == undefined || valor.trim() == '')
        && (data == undefined || data.trim() == '') && (categoria_id == undefined || categoria_id.trim() == '')) {
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados" })
    }
    const transaction_id = await insertTransactions(usuario_id, tipo, descricao, valor, data, categoria_id);
    const transactions = await selectTransactionsById(usuario_id, transaction_id);


    return res.status(200).json(
        transactions[0]
    )
})

Router.put('/:id', authenticationService, async (req, res) => {
    const id = req.params.id
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const transactions = await selectTransactionsById(req.id, id);
    if (transactions.length == 0 || transactions == undefined) {
        res.status(400).json({ mensagem: "Essa transação não existe" });
    } else {
        if ((descricao == undefined || descricao.trim() == '') && (valor == undefined || valor.trim() == '') && (data == undefined || data.trim() == '')
            && (categoria_id == undefined || categoria_id.trim() == '') && (tipo == undefined || tipo.trim() == '')) {
            res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
        }

        if (descricao != undefined && descricao.trim() != '') {
            await updateTransactions("descricao", descricao, id);
        }
        if (valor != undefined) {
            await updateTransactions("valor", valor, id);
        }
        if (data != undefined && data.trim() != '') {
            await updateTransactions("data", data, id);
        }
        if (categoria_id != undefined) {
            await updateTransactions("categoria_id", categoria_id, id);
        }
        if (tipo != undefined && tipo.trim() != '') {
            await updateTransactions("tipo", tipo, id);
        }

    }

    return res.status(200).send()
})

Router.delete('/:id', authenticationService, async (req, res) => {
    const id = req.params.id
    const transactions = await selectTransactionsById(req.id, id);

    if (transactions.length == 0 || transactions == undefined) {
        res.status(400).json({ mensagem: "Essa transação não existe" });
    } else {
        await deleteTransactions(req.params.id);
    }
    return res.status(200).send()

})

export { Router }

