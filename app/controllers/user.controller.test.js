const {userService: service} = require("../services")
const controller = require("./user.controller")


describe(`User Controller`, () => {

    const userMock = {
        username: "Username",
        password: "Password",
    }

    /**
     * @return {Response}
     */
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res)
        res.send = jest.fn().mockReturnValue(res)
        return res;
    }

    const serviceMock = jest.spyOn(service, "create")

    beforeEach(() => {
        jest.resetAllMocks()
    })

    describe("Create Users", () => {

        it('should request create new user', async function () {
            userMock.toDTO = jest.fn().mockReturnValue({})
            serviceMock.mockImplementation(() => Promise.resolve(userMock))
            const res = mockResponse()
            const req = {
                body: userMock
            }

            await controller.register(req, res, null)

            expect(userMock.toDTO).toBeCalled()
        })

        it('should not accept create user blank', async function () {
            serviceMock.mockImplementation(() => Promise.resolve(userMock))
            const res = mockResponse()
            const req = {
                body: {}
            }
            const error = new Error("Invalid user.")
            const next = jest.fn().mockImplementation((err) => error)

            await controller.register(req, res, next)

            expect(res.send).not.toBeCalled()
            expect(next).toBeCalledWith(error)
        });

    })

})
