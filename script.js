const entityData = {
  urbana: {
    name: "Centro urbano",
    badge: "Alta rotación",
    demand: "420 lotes",
    demandTrend: "+12% frente a la media",
    pickups: "8 rutas",
    pickupTrend: "3 prioritarias hoy",
    waste: "14%",
    wasteTrend: "baja si se adelanta el reparto",
    model: "Modelo tabular + reglas",
    bars: [
      { label: "Fruta", value: 88 },
      { label: "Verdura", value: 74 },
      { label: "Lácteos", value: 58 },
      { label: "Secos", value: 42 },
      { label: "Infantil", value: 36 }
    ],
    alerts: [
      {
        title: "Lote sensible en 2 horas",
        body: "32 kg de fruta fresca requieren salida prioritaria entre las 17:00 y las 19:00."
      },
      {
        title: "Pico de demanda en zona centro",
        body: "El sistema prevé más solicitudes de lotes familiares por acumulación de entregas semanales."
      },
      {
        title: "Donación grande confirmada",
        body: "Un supermercado registró panadería y verdura con recogida en ventana corta."
      }
    ],
    routes: [
      {
        title: "Ruta 1 · Mercado Norte → Banco Centro",
        body: "Prioridad alta por perecederos y cercanía geográfica."
      },
      {
        title: "Ruta 2 · Hotel Alameda → Cocina social",
        body: "Recogida coordinada con salida directa para reducir manipulación."
      },
      {
        title: "Ruta 3 · Refuerzo barrio sur",
        body: "Se recomienda aumentar 11% la dotación de lotes secos."
      }
    ]
  },
  mixta: {
    name: "Entidad semiurbana",
    badge: "Balance estable",
    demand: "290 lotes",
    demandTrend: "+5% frente a la media",
    pickups: "5 rutas",
    pickupTrend: "2 combinadas por eficiencia",
    waste: "11%",
    wasteTrend: "riesgo moderado en fresco",
    model: "Predicción semanal + reglas de cobertura",
    bars: [
      { label: "Fruta", value: 64 },
      { label: "Verdura", value: 56 },
      { label: "Lácteos", value: 44 },
      { label: "Secos", value: 52 },
      { label: "Infantil", value: 28 }
    ],
    alerts: [
      {
        title: "Equilibrio entre stock y demanda",
        body: "No se detecta saturación, pero conviene adelantar una recogida de verdura."
      },
      {
        title: "Ventana útil de lácteos",
        body: "Se sugiere derivar parte del lote a la entidad con mayor rotación."
      },
      {
        title: "Ruta consolidada recomendada",
        body: "Dos donaciones cercanas pueden agruparse en una sola salida."
      }
    ],
    routes: [
      {
        title: "Ruta 1 · Supermercado local → almacén comarcal",
        body: "Recogida agrupada con descarga clasificada por categoría."
      },
      {
        title: "Ruta 2 · Restaurante colaborador → reparto oeste",
        body: "La plataforma prioriza destino con mayor déficit en fresco."
      },
      {
        title: "Ruta 3 · Transferencia interna",
        body: "Enviar excedente de fruta a punto con demanda creciente."
      }
    ]
  },
  rural: {
    name: "Cobertura dispersa",
    badge: "Más distancia, más planificación",
    demand: "180 lotes",
    demandTrend: "+9% por menor frecuencia de reparto",
    pickups: "4 rutas",
    pickupTrend: "ventanas más largas y concentradas",
    waste: "9%",
    wasteTrend: "mejora si se consolida carga",
    model: "Predicción semanal + priorización territorial",
    bars: [
      { label: "Fruta", value: 42 },
      { label: "Verdura", value: 38 },
      { label: "Lácteos", value: 32 },
      { label: "Secos", value: 62 },
      { label: "Infantil", value: 24 }
    ],
    alerts: [
      {
        title: "Cobertura territorial sensible",
        body: "La próxima entrega requiere agrupar puntos para reducir kilómetros y mantener servicio."
      },
      {
        title: "Stock seco por debajo de objetivo",
        body: "Se recomienda reforzar conservas y legumbre frente a la previsión semanal."
      },
      {
        title: "Perecederos con traslado directo",
        body: "Parte del fresco debe salir sin pasar por almacenamiento prolongado."
      }
    ],
    routes: [
      {
        title: "Ruta 1 · Agrupación de pueblos norte",
        body: "Salida única con lotes preparados por parada para ahorrar tiempo operativo."
      },
      {
        title: "Ruta 2 · Donación agrícola → reparto directo",
        body: "Entrega prioritaria de hortaliza a la zona con mayor déficit."
      },
      {
        title: "Ruta 3 · Reposición de secos",
        body: "Conviene reforzar stock de larga duración en almacén satélite."
      }
    ]
  }
};

const ui = {
  entityName: document.getElementById("entity-name"),
  entityBadge: document.getElementById("entity-badge"),
  demandValue: document.getElementById("demand-value"),
  demandTrend: document.getElementById("demand-trend"),
  pickupValue: document.getElementById("pickup-value"),
  pickupTrend: document.getElementById("pickup-trend"),
  wasteValue: document.getElementById("waste-value"),
  wasteTrend: document.getElementById("waste-trend"),
  modelTag: document.getElementById("model-tag"),
  bars: document.getElementById("forecast-bars"),
  alerts: document.getElementById("alert-list"),
  routes: document.getElementById("route-list")
};

function renderBars(items) {
  ui.bars.innerHTML = "";
  items.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "bar";

    const value = document.createElement("span");
    value.className = "bar-value";
    value.textContent = `${item.value}%`;

    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.height = `${Math.max(item.value, 18)}%`;
    fill.style.animationDelay = `${index * 90}ms`;

    const label = document.createElement("span");
    label.className = "bar-label";
    label.textContent = item.label;

    wrapper.append(value, fill, label);
    ui.bars.append(wrapper);
  });
}

function renderAlerts(items) {
  ui.alerts.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "alert-item";
    li.innerHTML = `<strong>${item.title}</strong><p>${item.body}</p>`;
    ui.alerts.append(li);
  });
}

function renderRoutes(items) {
  ui.routes.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.title}</strong><span>${item.body}</span>`;
    ui.routes.append(li);
  });
}

function setEntity(entityKey) {
  const entity = entityData[entityKey];
  if (!entity) return;

  ui.entityName.textContent = entity.name;
  ui.entityBadge.textContent = entity.badge;
  ui.demandValue.textContent = entity.demand;
  ui.demandTrend.textContent = entity.demandTrend;
  ui.pickupValue.textContent = entity.pickups;
  ui.pickupTrend.textContent = entity.pickupTrend;
  ui.wasteValue.textContent = entity.waste;
  ui.wasteTrend.textContent = entity.wasteTrend;
  ui.modelTag.textContent = entity.model;

  renderBars(entity.bars);
  renderAlerts(entity.alerts);
  renderRoutes(entity.routes);

  document.querySelectorAll(".switch").forEach((button) => {
    button.classList.toggle("active", button.dataset.entity === entityKey);
  });
}

document.querySelectorAll(".switch").forEach((button) => {
  button.addEventListener("click", () => setEntity(button.dataset.entity));
});

setEntity("urbana");
