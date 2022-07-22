import jwt from "jsonwebtoken"
import express from "express";
import { db } from "../dindin/databaseConnection.js";
import { comparePasswordService, hashPasswordService } from "../services/hashPasswordService.js";
import { selectEmail, selectId, selectName, updateUser } from "../repositories/usersRepository.js";
import { authenticationService } from "../services/authenticationService.js";
const Router = express.Router();


Router.post('/register', async (req, res) => {
    const { nome, email, password } = req.body;

    if (nome == undefined || nome.trim() == '') {
        return res.status(400).json({ m: 'nome errado' })
    }
    if (email == undefined || email.trim() == '') {
        return res.status(400).json({ m: 'nome errado' })
    }
    if (password == undefined || password.trim() == '') {
        return res.status(400).json({ m: 'nome errado' })
    }
    const hashedPassword = await hashPasswordService(password);

    db.query(
        `INSERT INTO dindin.users(nome, senha, email) VALUES('${nome}', '${hashedPassword}', '${email}')`,
        async (err, db_res) => {
            if (err != undefined) {
                return res.status(403).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." })
            } else {
                const id = await selectId(email)
                return res.status(201).json({ id, nome, email })
            }

        }
    );

})

Router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    db.query(`SELECT senha FROM dindin.users WHERE email = '${email}'`, async (err, db_res) => {
        if (db_res.rows[0] == undefined) {
            return res.status(400).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }
        const senhadb = await db_res.rows[0].senha
        const correctPassword = await comparePasswordService(password, senhadb);
        if (correctPassword) {
            const id = await selectId(email)
            const name = await selectName(email)
            const token = jwt.sign({
                id
            }, process.env.SECRET_KEY_JWT, { expiresIn: '1h' });

            return res.status(200).json({
                usuario: {
                    id: id, nome: name, email: email
                }, token
            })
        } else {
            return res.status(400).json({
                mensagem: "Usuário e/ou senha inválido(s)."
            })
        }
    })

})

Router.get('/', authenticationService, async (req, res) => {
    const id = req.id
    const email = await selectEmail(id)
    const name = await selectName(email)
    return res.status(200).json({
        id: id, nome: name, email: email
    })
})

Router.put('/', authenticationService, async (req, res) => {
    const id = req.id
    const { nome, email, password } = req.body

    if ((nome == undefined || nome.trim() == '') && (email == undefined || email.trim() == '') && (password == undefined || password.trim() == '')) {
        res.status(400).json({ mensagem: "Um ou mais campos devem ser preenchidos" });
    }

    if (nome != undefined && nome.trim() != '') {
        await updateUser("nome", nome, id);
    }
    if (email != undefined && email.trim() != '') {
        const updateresponse = await updateUser("email", email, id);
        if (updateresponse.includes("error")) {
            res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
        }
    }
    if (password != undefined && password.trim() != '') {
        const hashedPassword = await hashPasswordService(password);
        await updateUser("senha", hashedPassword, id);

    }

    return res.status(200).send()
})

export { Router }
