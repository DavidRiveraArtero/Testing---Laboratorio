import React, { useState } from "react"
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { ConfirmationDialogComponent } from "./confirmation-dialog.component"
import userEvent from '@testing-library/user-event'
import { C } from "vitest/dist/chunks/reporters.d.DG9VKi4m"

describe('Component Dialog', () => {
  
    
    it('should render the dialog when isOpen is true', () => { 
        // ARR
     
        // ACT 
        render( <ConfirmationDialogComponent 
                isOpen={true}
                onAccept={() => {}} 
                onClose={() => {}}
                title='hola'
                labels={{closeButton:"Close", acceptButton: "Accept"}}

                />
            )
        // ASS
        const elementDialog = screen.queryByRole('dialog')


        expect(elementDialog).toBeInTheDocument()
    })

    it('should not render the dialog when isOpen is false', () => { 
        // ARR
     
        // ACT 
        render( <ConfirmationDialogComponent 
                isOpen={false}
                onAccept={() => {}} 
                onClose={() => {}}
                title='hola'
                labels={{closeButton:"Close", acceptButton: "Accept"}}
                />
        )
        // ASS
        const getDialog = screen.queryByRole('dialog')
        expect(getDialog).not.toBeInTheDocument()

    })

    it('should display correct title and buttons when rendered', () => { 
        // ARR
        const props: React.ComponentProps<typeof ConfirmationDialogComponent> = 
        {
          isOpen: true,
          onAccept: () => {}, 
          onClose: () => {},
          title: 'hola',
          labels: {closeButton:"Close", acceptButton: "Accept"}
        }
        // ACT 
        render( <ConfirmationDialogComponent {...props} />)
        // ASS

        const elementTitle = screen.getByText('hola')
        expect(elementTitle).not.toBeNull()
        expect(elementTitle.tagName).toEqual('H2')

        const elementClose = screen.getByText('Close')
        const elementAccept = screen.getByText('Accept')

        expect(elementClose.tagName).toEqual('BUTTON')
        expect(elementAccept.tagName).toEqual('BUTTON')
    })


    it('snapshot page dialoge', () => {
        const isOpen = true 
        const {baseElement} = render(<ConfirmationDialogComponent 
            isOpen={isOpen}
            onAccept={() => {}} 
            onClose={() => {!isOpen}}
            title='hola'
            labels={{closeButton:"Close", acceptButton: "Accept"}}
        />)

        expect(baseElement).toMatchInlineSnapshot(`
          <body
            style="padding-right: 1024px; overflow: hidden;"
          >
            <div
              aria-hidden="true"
            />
            <div
              class="MuiDialog-root MuiModal-root css-1424xw8-MuiModal-root-MuiDialog-root"
              role="presentation"
            >
              <div
                aria-hidden="true"
                class="MuiBackdrop-root MuiModal-backdrop css-1cennmq-MuiBackdrop-root-MuiDialog-backdrop"
                style="opacity: 1; webkit-transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"
              />
              <div
                data-testid="sentinelStart"
                tabindex="0"
              />
              <div
                class="MuiDialog-container MuiDialog-scrollPaper css-19do60a-MuiDialog-container"
                role="presentation"
                style="opacity: 1; webkit-transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"
                tabindex="-1"
              >
                <div
                  aria-labelledby="«r7»"
                  aria-modal="true"
                  class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-10d30g3-MuiPaper-root-MuiDialog-paper"
                  role="dialog"
                  style="--Paper-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12);"
                >
                  <h2
                    class="MuiTypography-root MuiTypography-h6 MuiDialogTitle-root css-rvoa5x-MuiTypography-root-MuiDialogTitle-root"
                    id="«r7»"
                  >
                    hola
                  </h2>
                  <div
                    class="MuiDialogContent-root css-kw13he-MuiDialogContent-root"
                  />
                  <div
                    class="MuiDialogActions-root MuiDialogActions-spacing css-15fu35s-MuiDialogActions-root"
                  >
                    <button
                      class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorSecondary MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorSecondary css-1mns5ui-MuiButtonBase-root-MuiButton-root"
                      tabindex="0"
                      type="button"
                    >
                      Close
                    </button>
                    <button
                      class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-74d805-MuiButtonBase-root-MuiButton-root"
                      tabindex="0"
                      type="button"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
              <div
                data-testid="sentinelEnd"
                tabindex="0"
              />
            </div>
          </body>
        `)
        
        
     })

    it('should not render the dialog component when we click on "Close" button', async() => {
    
      const Render = () => {
        const [isOpen, setIsOpen] = useState(true)
       
        const props: React.ComponentProps<typeof ConfirmationDialogComponent> = 
        {
          isOpen: isOpen,
          onAccept: () => {}, 
          onClose: () => setIsOpen(false),
          title: 'hola',
          labels: {closeButton:"Close", acceptButton: "Accept"}
        }

        return <ConfirmationDialogComponent {...props}/>
      }
        
      render(<Render/>)
      const buttonClose = screen.getByRole('button', {
        name: /close/i
      })
      
      await userEvent.click(buttonClose)

      await waitForElementToBeRemoved(screen.getByRole('dialog'))
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
   


    })  

    
})