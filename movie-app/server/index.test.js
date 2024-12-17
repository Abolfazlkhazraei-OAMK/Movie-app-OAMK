import { expect } from "chai";
import { response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
const {sign} = jwt
dotenv.config({path: "./.env"});


const base_url = 'http://localhost:3001'

describe('POST login', () => {
    const email = 'test1@gmail.com'
    const password = 'test1234'

    it ('should login with valid credentials', async() => {
        const response = await fetch(base_url + 'api/user/login', {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({'email': email, 'password': password})
        })
        const data = await response.json()
        expect(response.status).to.equal(200, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('email')
    })
})

describe('POST register',() => {
    it ('should register with valid email and password', async() => {
        const firstname = "test"
        const lastname = "test"
        const email = 'register13@foo.com'
        const password = 'register123'
        const response = await fetch(base_url + 'api/user/register', {
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'firstname': firstname, 'lastname': lastname, 'email': email, 'password': password})
        })
        const data = await response.json()
        expect(response.status).to.equal(201, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('email')
    })
})

describe('POST delete', () => {
    it ('should delete a user', async() => {
        const email = 'register13@foo.com'
        const password = 'register123'
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        // const token = sign(email, process.env.TMDB_ACCESS_TOKEN)
        const token = jwt.sign({ email }, process.env.JWT_SECRET)
        const response = await fetch(base_url + 'api/user/delete-account', {
            method: 'delete',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            }, 
            body: JSON.stringify({email: 'register13@foo.com',
            password: 'register123'})
        })
        const data = await response.json()
        expect(response.status).to.equal(200, data.error)
        expect(data).to.be.an('object')
        // expect(data).to.include.all.keys('email')
    })
})
