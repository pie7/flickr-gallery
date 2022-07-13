import { useState, useContext } from "react";
import { AppContext, UPDATE_ITEMS_ID } from "../App";

const IconHeart = () =>
    <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.701 471.701"><path d="M433.601 67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7 13.6-92.4 38.3l-12.9 12.9-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4-34.8 0-67.6 13.6-92.2 38.2-24.7 24.7-38.3 57.5-38.2 92.4 0 34.9 13.7 67.6 38.4 92.3l187.8 187.8c2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-3.9l188.2-187.5c24.7-24.7 38.3-57.5 38.3-92.4.1-34.9-13.4-67.7-38.1-92.4zm-19.2 165.7-178.7 178-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3s10.7-53.7 30.3-73.2c19.5-19.5 45.5-30.3 73.1-30.3 27.7 0 53.8 10.8 73.4 30.4l22.6 22.6c5.3 5.3 13.8 5.3 19.1 0l22.4-22.4c19.6-19.6 45.7-30.4 73.3-30.4 27.6 0 53.6 10.8 73.2 30.3 19.6 19.6 30.3 45.6 30.3 73.3.1 27.7-10.7 53.7-30.3 73.3z" /></svg>

const IconHeartFill = () =>
    <svg className="fill-red-500" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z" /><path d="M12.001 4.529a5.998 5.998 0 0 1 8.242.228 6 6 0 0 1 .236 8.236l-8.48 8.492-8.478-8.492a6 6 0 0 1 8.48-8.464z" /></svg>

const Favorite = ({ itemId = '' }) => {
    const { state, dispatch } = useContext(AppContext)
    const [isFavo, setIsFavo] = useState(state.itemIds?.some((id: string) => id === itemId))

    const handleClick = (e: any) => {
        if (e && e.stopPropagation) e.stopPropagation()
        setIsFavo(!isFavo)

        let newItemIds
        if (isFavo) {
            newItemIds = state.itemIds.filter((id: string) => id !== itemId)
        } else {
            newItemIds = [...state.itemIds, itemId]
        }

        dispatch({
            type: UPDATE_ITEMS_ID,
            payload: {
                itemIds: newItemIds
            }
        })
    }

    return (
        <span onClick={handleClick} className="w-6 h-6 inline-block">
            {isFavo
                ? < IconHeartFill />
                : < IconHeart />
            }
        </span>
    )
}
export default Favorite