import { mapProjectFromApiToVm } from "./project.mapper"
import * as viewModel from './project.vm';

describe("Testing mapProjectFromApiToVm from /pods/project/project.mapper", () => {
    it("Return a Project with one employee", () => {
        // ARR
        const project:viewModel.Project = {
            employees:[{id:"1",employeeName:"Juan", isAssigned:true}],
            id:"1",
            isActive:true,
            name:"Project 1",
            comments: "",
            externalId:"1"
        }
        // ACT
        const result = mapProjectFromApiToVm(project)

        // ASSERT
        expect(result).toStrictEqual(project)
    })

    it("Return a Empty object if we pass a undefined or null value", () => {
        // ARR
        const a = {
                id: '',
                name: '',
                externalId: '',
                comments: '',
                isActive: false,
                employees: [],
        }
        // ACT
        const result =  mapProjectFromApiToVm(undefined!)
        // ASSERT
        expect(result).toStrictEqual(a)

    })

    it("Regresa un objeto donde Employee regresa un array vacio si le pasamos cualquier otra cosa que no sea un array", () => {
        // ARR
        const a = {
                id: '',
                name: '',
                externalId: '',
                comments: '',
                isActive: false,
                employees: 'hola',
        }

        // ACT
        const result = mapProjectFromApiToVm(a)
        // ASSERT
        expect(result).toStrictEqual({
            id: '',
            name: '',
            externalId: '',
            comments: '',
            isActive: false,
            employees: [],
        })
    })
})