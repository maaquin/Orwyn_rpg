import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    closestCorners,
    useSensors,
    useSensor
} from '@dnd-kit/core';
import {
    SortableContext,
    rectSwappingStrategy,
    arrayMove,
    sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import { InventorySlot } from './InventorySlot';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const Inventory = ({ inventory, toggleExpanded, isExpanded, player }) => {
    const { t } = useTranslation();
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (inventory) {
            setItems(inventory);
        }
    }, [inventory]);

    useEffect(() => {
        const data = localStorage.getItem("partida");
        if (data) {
            const parsed = JSON.parse(data);
            parsed.inventory = items;
            localStorage.setItem("partida", JSON.stringify(parsed));
        }
    }, [items]);


    const getPosition = id => items.findIndex(item => item.id === id);

    const handleDrag = event => {
        const { active, over } = event;

        if (active.id === over.id) return;


        setItems(items => {
            const originalPosition = getPosition(active.id)
            const newPosition = getPosition(over.id);

            return arrayMove(items, originalPosition, newPosition);
        })
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    return (
        <div className={`inventory-object ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className='items-inventory-container'>
                <DndContext collisionDetection={closestCorners} sensors={sensors} onDragEnd={handleDrag}>
                    <div className='items-inventory-grid'>
                        <SortableContext items={items} strategy={rectSwappingStrategy}>
                            {items.map((item, index) => (
                                <InventorySlot
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </SortableContext>
                    </div>
                </DndContext>
                <img
                    src="images/ornaments/arrow_inventory.webp"
                    className={`arrow-expand-inventory ${isExpanded ? 'rotated' : ''}`}
                    onClick={toggleExpanded}
                    style={{ cursor: 'pointer', marginTop: '15px', padding: '0 10px' }}
                    alt="toggle inventory"
                />
            </div>

            <div className='data-money-player'>
                <span className='items-title-span'>
                    <img src="images/icons/coin.webp" alt="money icon" />
                    {t('money')}
                </span>

                x{player.money}
            </div>


            <div className='misions-container'>
                <span className='items-title-span'>{t('quests')}:</span>
            </div>
        </div>
    );
};