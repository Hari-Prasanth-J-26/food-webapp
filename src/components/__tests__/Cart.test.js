import { BrowserRouter } from "react-router-dom";

import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import { fireEvent, render, screen } from "@testing-library/react";
import MOCK_DATA from "../mocks/mockDataResMenu.json"
import { act } from "react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA)
    })
})

it("Should load restaurant menu components", async () => {
    await act(async () => {
        render(
            <Provider store={appStore}>
                <BrowserRouter>
                    <Header />
                    <RestaurantMenu />
                </BrowserRouter>
            </Provider>
        ) 
    })

    const accordianHeader = screen.getByText("Recommended (20)");
    fireEvent.click(accordianHeader);

    const foodItemsCount = screen.getAllByTestId("foodItems");
    expect(foodItemsCount.length).toBe(20);

    expect(screen.getByText("🛒🛍️(0)")).toBeInTheDocument();
    const addBtns = screen.getAllByRole("button", {name:"ADD"});
    fireEvent.click(addBtns[0]);
    expect(screen.getByText("🛒🛍️(1)")).toBeInTheDocument();
})