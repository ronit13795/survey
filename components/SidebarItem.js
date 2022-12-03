import { useDrag } from "react-dnd";
import styles from "../styles/Sidebar.module.css"
import itemTypes from "../src/sidebarItemTypes";

const style = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    cursor: "move",
    float: "left"
};



export default function SidebarItem({ name, questionType, addQuestion }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'box',
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                const questionObj = itemTypes[questionType];
                (() => {
                    addQuestion()
                })()
                // alert(`You dropped ${item.name} into ${dropResult.name}!`);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId()
        })
    }));


    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
            {name}
        </div>
    );
}
