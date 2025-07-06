import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

export const InventorySlot = ({ item, equipment, e }) => {
    const { t } = useTranslation();
    const menuRef = useRef();
    const slotRef = useRef();

    const getEquippedSlot = (item) => {
        for (const [slot, equippedItem] of Object.entries(e)) {
            if (equippedItem?.id === item.id) return slot;
        }
        return null;
    };

    const equippedSlot = getEquippedSlot(item);

    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        item: null,
    });

    useEffect(() => {
        const closeMenu = () => setContextMenu((prev) => ({ ...prev, visible: false }));
        window.addEventListener('click', closeMenu);
        return () => window.removeEventListener('click', closeMenu);
    }, []);

    useEffect(() => {
        const closeMenu = (e) => {
            // Si el clic es dentro del menú o dentro del mismo slot, no cerrar
            if (
                menuRef.current?.contains(e.target) ||
                slotRef.current?.contains(e.target)
            ) return;

            setContextMenu((prev) => ({ ...prev, visible: false }));
        };

        // Captura para interceptar antes que otros handlers
        window.addEventListener('click', closeMenu, true);

        return () => window.removeEventListener('click', closeMenu, true);
    }, []);

    useEffect(() => {
        if (contextMenu.visible && menuRef.current) {
            const menu = menuRef.current;
            const { innerWidth, innerHeight } = window;
            const menuRect = menu.getBoundingClientRect();

            let newX = contextMenu.x;
            let newY = contextMenu.y;

            const padding = 10;

            if (newX + menuRect.width > innerWidth) {
                newX = innerWidth - menuRect.width - padding;
            }

            if (newY + menuRect.height > innerHeight) {
                newY = innerHeight - menuRect.height - padding;
            }

            if (newX !== contextMenu.x || newY !== contextMenu.y) {
                setContextMenu((prev) => ({ ...prev, x: newX, y: newY }));
            }
        }
    }, [contextMenu.visible]);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: isDragging ? 'grabbing' : 'grab',
    }

    const handleClick = (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        if (!item || item.name === 'empty') return;

        const rect = slotRef.current.getBoundingClientRect();

        const estimatedMenuHeight = 90;
        const estimatedMenuWidth = 120;
        const padding = 10;

        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;

        const { innerWidth, innerHeight } = window;

        // Corrección horizontal
        if (x + estimatedMenuWidth > innerWidth - padding) {
            x = innerWidth - estimatedMenuWidth - padding;
        }

        // Corrección vertical
        if (y + estimatedMenuHeight > innerHeight - padding) {
            y = innerHeight - estimatedMenuHeight - padding;
        }

        // Si no cabe abajo, mostrar arriba
        if (y + estimatedMenuHeight > innerHeight - padding) {
            y = rect.top - estimatedMenuHeight;
            if (y < padding) y = padding;
        }

        setContextMenu({
            visible: true,
            x,
            y,
            item,
        });
    };

    const useItem = () => {

    };

    const equipItem = (slot, item) => {
        equipment(prev => ({ ...prev, [slot]: item }));
    };

    const unequipItem = (slot) => {
        equipment(prev => ({ ...prev, [slot]: null }));
    };

    console.log(item)

    return (
        <div
            ref={(node) => {
                setNodeRef(node);
                slotRef.current = node;
            }}
            {...attributes} {...listeners}
            className='inventory-slot'
            onClick={(e) => handleClick(e, item)}
            style={style}
            title={`${item.name}: ${item.description}`}
        >
            {item && item.name !== 'empty' && (
                <>
                    <img
                        src={`images/items/${item.img}.webp`}
                        alt={item}
                        style={{ width: '48px', height: '48px', pointerEvents: 'none' }}
                    />
                    {item.quantity > 1 && (
                        <span className='quantity-item'>{item.quantity}</span>
                    )}
                </>
            )}

            {contextMenu.visible && ReactDOM.createPortal(
                <div
                    ref={menuRef}
                    className="inventory-context-menu"
                    style={{
                        position: 'fixed',
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        zIndex: 9999
                    }}
                >
                    {equippedSlot ? (
                        <div className="menu-item" onClick={() => unequipItem(equippedSlot)}>{t('desequip')}</div>
                    ) : item.type === 'gear' ? (
                        <>
                            <div className="menu-item" onClick={() => equipItem('left', item)}>{t('equip left')}</div>
                            <div className="menu-item" onClick={() => equipItem('right', item)}>{t('equip right')}</div>
                        </>
                    ) : item.type === 'equip' ? (
                        <div className="menu-item" onClick={() => equipItem('chest', item)}>{t('equip')}</div>
                    ) : item.type === 'consumables' || item.type === 'fishing' ? (
                        <div className="menu-item" onClick={() => useItem(item)}>{t('use')}</div>
                    ) : item.type === 'key' ? (
                        <div className="menu-item" onClick={() => useItem(item)}>{t('inspect')}</div>
                    ) : null}
                </div>,
                document.getElementById('menu-portal-root')
            )}
        </div>
    );
};