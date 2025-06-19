export function Lines() {
        const celdas = [];

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                celdas.push(
                    <div
                        key={`${row}-${col}`}
                        className="cell"
                        style={{
                            top: `${row * 10}%`,
                            left: `${col * 10}%`,
                        }}
                    />
                );
            }
        }

        return <div className="grid-container">{celdas}</div>;
    }