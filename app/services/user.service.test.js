const bcrypt = require("bcrypt")
const {ValidationError} = require("sequelize")
const {User: model} = require("../models")
const service = require("./user.service")

describe("User Service", function () {

    describe("Create User", function () {
        beforeEach(() => {
            jest.resetAllMocks()
        })
        const userMock = () => ({
            username: "Username",
            password: "Password",
        })
        const modelMock = {
            create: jest.spyOn(model, "create")
        }
        const bcryptMock = {
            hashSync: jest.spyOn(bcrypt, "hashSync")
        }


        it('should create user successful', async function () {
            const userExpected = {
                ...userMock(),
                password: "password hashed!",
            }

            bcryptMock.hashSync.mockImplementation(() => "password hashed!")
            modelMock.create.mockReturnValue(Promise.resolve(userExpected))

            const result = await service.create(userMock())

            expect(bcryptMock.hashSync).toBeCalledWith(userMock().password, 10)
            expect(modelMock.create).toBeCalledWith(userExpected)
            expect(result).toEqual(userExpected)
        })

        it('should not create invalid username', function (done) {
            const userInput = {
                username: null,
                password: "password hashed!",
            }
            const error = new ValidationError("Usuário inválido.")
            modelMock.create.mockImplementation(() => Promise.reject(error))

            service.create(userInput).catch((result) => {
                expect(result).toBeInstanceOf(ValidationError)
                done()
            })
        })

    })

})
