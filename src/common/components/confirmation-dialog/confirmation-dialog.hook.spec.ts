import { renderHook, act } from "@testing-library/react"
import { useConfirmationDialog } from "./confirmation-dialog.hook"
import { Lookup } from "#common/models"

describe('Confirmation Dialog Hook', () => {

    it('should set isOpen to false by default', () => { 
        // ARRANGE
        // ACT
        const {result} = renderHook(useConfirmationDialog)

        // ASSERT
        expect(result.current.isOpen).toBe(false)
    })
    
    it('should set isOpen to true when we use a onOpenDialog function', () => {
        // ARRANGE

        // ACT
        const {result} = renderHook(useConfirmationDialog)
        const onOpenDialogSpy = vi.spyOn(result.current, 'onOpenDialog')
        act(() => {
            result.current.onOpenDialog({name:"", id:""})
        })
        // ASSERT
        expect(onOpenDialogSpy).toHaveBeenCalledTimes(1)
        expect(result.current.isOpen).toBe(true)
    })

    it('should set a default object Lookup when we ussing a onAccept function', () => { 
        // ARRANGE
        const defaultLookup:Lookup = {
            id:"",
            name: ""
        }

        // ACT
        const { result } = renderHook(useConfirmationDialog)
        const onAcceptSyp = vi.spyOn(result.current, 'onAccept')
        act(() => {
            result.current.onAccept()
        })

        // ASSERT
        expect(onAcceptSyp).toHaveBeenCalledTimes(1)
        expect(result.current.itemToDelete).toStrictEqual(defaultLookup)
    })
})