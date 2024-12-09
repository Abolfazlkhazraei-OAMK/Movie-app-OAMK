import { expect } from "chai";
import { response } from "express";

const base_url = 'http://localhost:3001'

describe('POST login', () => {
    const email = 'test1@gmail.com'
    const password = 'test1234'

    it ('should login with valid credentials', async() => {
        const response = await fetch(base_url + '/user/login', {
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
        const response = await fetch(base_url + '/user/register', {
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