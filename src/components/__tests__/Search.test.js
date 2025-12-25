import { BrowserRouter } from "react-router-dom";

import Body from "../Body";
import { fireEvent, render, screen } from "@testing-library/react";
import MOCK_DATA from "../mocks/mockDataResList.json"
import { act } from "react";
import "@testing-library/jest-dom";


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    })
})

it("Should render the body component with the search button", async() => {
    await act(async () => 
        render(
        <BrowserRouter>
            <Body />
        </BrowserRouter> 
        )
    )
    const searchBtn = screen.getByRole("button", {name: "Search"});
    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, {target : {value : "burger"}});
    fireEvent.click(searchBtn);
    // ✅ Wait for filtered cards to appear
    const cards = screen.getAllByTestId("resCard");
    expect(cards.length).toBe(1);
})

/*
it("Should filter top rated restaurants", async() => {
    await act(async () => 
        render(
        <BrowserRouter>
            <Body />
        </BrowserRouter> 
        )
    )
    
    //Screen should contains the cards of number
    const cardsBeforeFilter = screen.getAllByTestId("resCard");
   // expect(cardsBeforeFilter.length).toBe(8);
    const topRatedBtn = screen.getByRole("button", {name: "Top Rated Restaurants"});
    fireEvent.click(topRatedBtn);
    const cardsAfterFilter = screen.getAllByTestId("resFilterCard");
    expect(cardsAfterFilter.length).toBe(4);
})
*/

