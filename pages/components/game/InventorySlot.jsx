import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


export const InventorySlot = ({ item }) => {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: isDragging ? 'grabbing' : 'grab',
    }

    return (
        <div
            ref={setNodeRef} {...attributes} {...listeners}
            className='inventory-slot'
            style={style}
        >
            {item && item.name !== 'empty' && (
                <img
                    src={`images/items/${item.name}.webp`}
                    alt={item}
                    style={{ width: '48px', height: '48px', pointerEvents: 'none' }}
                />
            )}
        </div>
    );
};