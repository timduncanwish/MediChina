"use client";

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
}

interface AddOnSelectorProps {
  addOns: AddOn[];
  selectedIds: string[];
  onToggle: (addOnId: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  imaging: "Imaging",
  blood: "Blood Work",
  genetic: "Genetics",
  wellness: "Wellness",
};

const CATEGORY_ORDER = ["imaging", "blood", "genetic", "wellness"];

export function AddOnSelector({ addOns, selectedIds, onToggle }: AddOnSelectorProps) {
  const activeAddOns = addOns.filter((a) => a.isActive);

  const grouped = CATEGORY_ORDER.reduce(
    (acc, cat) => {
      const items = activeAddOns.filter((a) => a.category === cat).sort((a, b) => a.sortOrder - b.sortOrder);
      if (items.length > 0) acc[cat] = items;
      return acc;
    },
    {} as Record<string, AddOn[]>
  );

  const selectedItems = activeAddOns.filter((a) => selectedIds.includes(a.id));
  const totalPrice = selectedItems.reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-muted-light">
        <h3 className="text-lg font-bold text-foreground font-heading flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          Enhance Your Package
        </h3>
      </div>

      <div className="divide-y divide-border">
        {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((cat) => (
          <div key={cat}>
            <div className="px-5 pt-4 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                {CATEGORY_LABELS[cat] ?? cat}
              </span>
            </div>
            <div className="px-3 pb-3 space-y-1">
              {grouped[cat].map((addOn) => {
                const isSelected = selectedIds.includes(addOn.id);
                return (
                  <label
                    key={addOn.id}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-primary-light border border-primary/20"
                        : "hover:bg-muted-light border border-transparent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(addOn.id)}
                      className="sr-only"
                    />
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "border-2 border-border"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-lg shrink-0">{addOn.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{addOn.name}</p>
                      <p className="text-xs text-muted truncate">{addOn.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary whitespace-nowrap">
                      +${addOn.price.toLocaleString()}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-border bg-primary-light">
        <p className="text-sm font-semibold text-foreground font-heading">
          Selected: {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}{" "}
          {selectedItems.length > 0 && (
            <span className="text-primary">
              (+${totalPrice.toLocaleString()})
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
