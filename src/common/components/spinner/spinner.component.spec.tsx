import React from "react";

import { screen, render, waitFor } from "@testing-library/react";


import { SpinnerComponent } from "./spinner.component";
import { usePromiseTracker } from 'react-promise-tracker';

vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('Test spinner',() => {

    it('should render the modal spinner when promiseInProgress is true', () => { 
        // ARRENGE
        vi.mocked(usePromiseTracker).mockReturnValue({
            promiseInProgress: true
        })
        // ACT
        render(<SpinnerComponent />)
        const getModal = screen.getByRole('presentation')
        // ASSERT
        
        expect(getModal).toBeInTheDocument()

    })

    it('should not render the modal spinner when is resolve promiseInProgress ("false") ', () => { 
        // ARRENGE
        vi.mocked(usePromiseTracker).mockReturnValue({
            promiseInProgress: false,
        })

        // ACT
        render(<SpinnerComponent />)
        const getModal = screen.queryByRole('presentation')

        // ASSERT
        expect(getModal).not.toBeInTheDocument()
    })

    it('should not render the modal spinner when is resolve promiseInProgress ("true") ', () => { 
        // ARRENGE
        vi.mocked(usePromiseTracker).mockReturnValue({
            promiseInProgress: false
        })

        // ACT
        render(<SpinnerComponent />)
        const getModal = screen.queryByRole('presentation')

        // ASSERT
        expect(getModal).not.toBeInTheDocument()
    })
})