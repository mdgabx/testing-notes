type Category = 'Sport' | 'Cruiser' | 'Touring' | 'Dirt' | 'Adventure' | 'Naked' | 'Electric';

interface Motorcycle {
    id: string;
    name: string;
    manufacturer: string;
    category: Category;
    price: number;
    image_url: string;
    created_at: Date;
    description: string;
    year: number;
}



const fetchMotorcycles = async (): Promise<Motorcycle[]> => {
    const url = "https://cdn.freecodecamp.org/curriculum/labs/data/motorcycle-shop/motorcycles.json";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed ${response.status}`)
        }

        const data = response.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

const renderMotorcycleCard = (motorcycle: Motorcycle): string => {
    return `<div class="motorcycle-card">
        <div class="motorcycle-card-image-container">
            <img class="motorcycle-card-image" src="${motorcycle.image_url}" />
            <div class="motorcycle-card-year-badge">${motorcycle.year}</div>
        </div>
        <div class="motorcycle-card-content">
            <div class="motorcycle-card-header">
                <div>
                    <h3 class="motorcycle-card-title">${motorcycle.name}</h3>
                    <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
                </div>
                 <div class="motorcycle-card-category">${motorcycle.category}</div>
            </div>
           
            <p class="motorcycle-card-description">${motorcycle.description}</p>
            <p class="motorcycle-card-price ">${motorcycle.price}</p>
        </div>
  </div>`;
}

class MotorcycleGalleryApp {
    private allMotorcycles: Motorcycle[] = [];
    private filterTerm: string = "";

    public async loadData(): Promise<void> {
        const data = await fetchMotorcycles();
        this.allMotorcycles = data;
    };

    public renderMotorcycles() {
        const grid = document.getElementById("motorcycle-grid") as HTMLElement;

        grid.innerHTML = this.allMotorcycles
            .map((motorcycle) => renderMotorcycleCard(motorcycle))
            .join("");

        // setting the motorcycles count
        const count = document.getElementById("results-number") as HTMLElement;
        if (count) {
            count.textContent = String(this.allMotorcycles.length);
        }

    };
}

document.addEventListener('DOMContentLoaded', async () => {
    const app = new MotorcycleGalleryApp();
    await app.loadData();
    app.renderMotorcycles();
})
