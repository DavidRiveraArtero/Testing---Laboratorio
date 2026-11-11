import { mapProjectFromApiToVm } from "./project.mapper"
import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';
import * as projectApi from "./api";

describe("Testing mapProjectFromApiToVm from /pods/project/project.mapper", () => {
    it("Return a Project with one employee", async () => {
        // ARR
        const project:viewModel.Project = {
            employees:[{id:"1",employeeName:"Juan", isAssigned:true}],
            id:"1",
            isActive:true,
            name:"Project 1",
            comments: "",
            externalId:"1"
        }

        vi.spyOn(projectApi, 'getProjectById').mockResolvedValue(project)

        const getProjectResult = await projectApi.getProjectById()
        // ACT
        const result = mapProjectFromApiToVm(getProjectResult)

        // ASSERT
        expect(result).toStrictEqual(project)
    })

    it.each<{project: apiModel.Project}>
    ([
        {project: undefined!},
        {project: null!}
    ])
    ('should return a default object if we pass a %s',({project}) => {
        // ACT
        const result =  mapProjectFromApiToVm(project)

        expect(result).toStrictEqual({
                id: '',
                name: '',
                externalId: '',
                comments: '',
                isActive: false,
                employees: [],
        })
    }) 

    it("should return an object with an empty Employee array when passed anything other than an array", async () => {
        // ARR
        const project = {
                id: '1',
                name: '',
                externalId: '',
                comments: '',
                isActive: false,
                employees: 'hola',
        }

        // @ts-ignore
        vi.spyOn(projectApi, 'getProjectById').mockResolvedValue(project)

        const projectResult = await projectApi.getProjectById()

        // ACT
        const result = mapProjectFromApiToVm(projectResult)
        // ASSERT
        expect(result).toStrictEqual({
            id: '1',
            name: '',
            externalId: '',
            comments: '',
            isActive: false,
            employees: []
        })
    })
})