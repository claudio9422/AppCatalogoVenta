import React, { useMemo, useState } from "react";
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  X,
  MessageCircle,
  MapPin,
  Clock,
  ChevronRight
} from "lucide-react";
import { categories, products } from "./data";

const WHATSAPP_NUMBER = "51992327662";

function formatPrice(value) {
  return `S/ ${value.toFixed(2)}`;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const categoryOk =
        selectedCategory === "todos" || product.category === selectedCategory;

      const searchOk =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return categoryOk && searchOk;
    });
  }, [selectedCategory, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);

      if (exists) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function sendWhatsApp() {
    if (!cart.length) return;

    const lines = cart.map(
      (item) =>
        `• ${item.name} x${item.quantity} = ${formatPrice(
          item.price * item.quantity
        )}`
    );

    const message = [
      "🍔 *NUEVO PEDIDO - FAST BURGER*",
      "",
      ...lines,
      "",
      `💰 *TOTAL: ${formatPrice(cartTotal)}*`,
      "",
      "Hola, quiero realizar este pedido. ¿Me confirman disponibilidad y delivery?"
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-overlay">
          <nav className="navbar container">
            <div className="brand">
              <span className="brand-icon">🍔</span>
              <div>
                <strong>FAST BURGER</strong>
                <small>BURGER • BROASTER • SALCHIPAPA</small>
              </div>
            </div>

            <button
              className="cart-button"
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrito"
            >
              <ShoppingCart size={21} />
              <span>Mi pedido</span>
              {cartCount > 0 && <b>{cartCount}</b>}
            </button>
          </nav>

          <div className="hero-content container">
            <span className="eyebrow">🔥 EL SABOR QUE TE ENCANTA</span>
            <h1>¡Come rico,<br />come <em>FAST!</em></h1>
            <p>
              Hamburguesas, pollo broaster y salchipapas preparados al momento.
            </p>
            <button
              className="hero-button"
              onClick={() =>
                document
                  .getElementById("menu")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver nuestro menú <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </header>

      <main id="menu" className="container main">
        <section className="info-strip">
          <div>
            <MapPin size={21} />
            <span><strong>Delivery</strong><small>Lima y alrededores</small></span>
          </div>
          <div>
            <Clock size={21} />
            <span><strong>Atención</strong><small>12:00 PM - 11:00 PM</small></span>
          </div>
          <div>
            <MessageCircle size={21} />
            <span><strong>Pedidos</strong><small>Por WhatsApp</small></span>
          </div>
        </section>

        <section className="menu-header">
          <div>
            <span className="section-label">NUESTRO MENÚ</span>
            <h2>Elige tu favorito</h2>
          </div>

          <label className="search-box">
            <Search size={19} />
            <input
              type="search"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </section>

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={selectedCategory === category.id ? "active" : ""}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span>{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </div>

        <section className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.popular && <span className="popular">⭐ Popular</span>}
              </div>

              <div className="product-body">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>

                <div className="product-footer">
                  <strong>{formatPrice(product.price)}</strong>
                  <button onClick={() => addToCart(product)}>
                    <Plus size={18} />
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {!filteredProducts.length && (
          <div className="empty-search">
            <span>🔎</span>
            <h3>No encontramos productos</h3>
            <p>Prueba con otra búsqueda o categoría.</p>
          </div>
        )}
      </main>

      {/* ========================================== */}
      {/* SECCIÓN DEL PIE DE PÁGINA (FOOTER) AÑADIDA */}
      {/* ========================================== */}
      <footer className="footer">
        <div className="footer-content container">
          <div className="footer-logo-wrapper">
            <span className="footer-emoji">🍔</span>
          </div>

          <h3 className="footer-title">FAST BURGER</h3>
          <p className="footer-subtitle">Burger • Broaster • Salchipapa</p>

          <div className="footer-divider"></div>

          <p className="footer-thanks">💖 ¡Gracias por visitarnos hoy!</p>

          <p className="footer-copyright">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>

          <p className="footer-credits">
            Hecho por{" "}
            <a
              href="https://wa.me/51992327662?text=Hola,%20me%20interesa%20un%20cat%C3%A1logo%20digital%20para%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-brand-link"
            >
              CatálogoYa
            </a>
          </p>
        </div>
      </footer>

      {cartCount > 0 && (
        <button className="floating-cart" onClick={() => setCartOpen(true)}>
          <span className="floating-left">
            <ShoppingCart size={20} />
            <b>{cartCount} producto{cartCount !== 1 ? "s" : ""}</b>
          </span>
          <strong>{formatPrice(cartTotal)}</strong>
        </button>
      )}

      {cartOpen && (
        <div className="modal-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div>
                <span className="section-label">TU PEDIDO</span>
                <h2>Mi carrito</h2>
              </div>
              <button className="close-button" onClick={() => setCartOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {!cart.length ? (
              <div className="empty-cart">
                <span>🛒</span>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega algo rico de nuestro menú.</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="continue-button"
                >
                  Ver menú
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <strong>{formatPrice(item.price)}</strong>

                        <div className="quantity">
                          <button onClick={() => changeQuantity(item.id, -1)}>
                            <Minus size={15} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)}>
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>

                      <button
                        className="delete-button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>
                  <small>El costo de delivery se coordina por WhatsApp.</small>

                  <button className="whatsapp-button" onClick={sendWhatsApp}>
                    <MessageCircle size={21} />
                    Pedir por WhatsApp
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;