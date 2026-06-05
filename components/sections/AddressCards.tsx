'use client';

const addresses = [
  {
    id: 2,
    city: 'Austin, Texas, USA',
    flag: '🇺🇸',
    address: 'Suite 2.408, 1616 Guadalupe Street',
    postcode: 'Austin, TX 78701',
    country: 'United States',
  },
];

export default function AddressCards() {
  return (
    <section
      className="section-padding bg-background-subtle"
      id="address-cards-section"
    >
      <div className="container-main">
        {/* Section label */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[2px] w-7 bg-[#E09900]" />
            <span
              className="text-[11px] font-bold tracking-[0.12em] uppercase"
              style={{ color: '#E09900' }}
            >
              OUR LOCATIONS
            </span>
            <div className="h-[2px] w-7 bg-[#E09900]" />
          </div>
          <h2 className="section-title">Find Us Around the World</h2>
        </div>

        {/* 1 Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {addresses.map((loc) => (
            <div
              key={loc.id}
              className="bg-background-card rounded-card border border-border shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
              style={{ borderTop: '4px solid #1B3A6B' }}
            >
              <div className="p-7 flex flex-col gap-4">
                {/* Icon + flag */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: 'rgba(27,58,107,0.06)' }}
                  >
                    📍
                  </div>
                  <div>
                    <span className="text-xl">{loc.flag}</span>
                    <p className="font-heading font-bold text-[15px] text-foreground leading-tight">
                      {loc.city}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Address */}
                <div>
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-1">
                    {loc.address}
                  </p>
                  <p className="text-sm text-foreground-secondary mb-1">
                    {loc.postcode}
                  </p>
                  <p
                    className="text-[13px] font-bold"
                    style={{ color: '#E09900' }}
                  >
                    {loc.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
