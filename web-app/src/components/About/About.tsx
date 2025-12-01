import React from 'react';
import styles from './About.module.css';
import { FiTarget, FiEye, FiBox, FiAward, FiActivity, FiUsers, FiShield, FiGlobe, FiTrendingUp, FiUserCheck, FiHeart, FiBookOpen, FiCpu, FiSmile } from 'react-icons/fi';

export const About: React.FC = () => {
  // Scroll al inicio al cargar
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className={styles.pageWrapper}>
      
      {/* 1. HERO CORPORATIVO: Identidad */}
      {/* Usamos heroHeight para hacerlo más pequeño verticalmente */}
      <section className={`${styles.slideSection} ${styles.bgBeige} ${styles.heroHeight}`}>
        <div className={styles.container}>
          <div className={styles.animate}>
            
            <span className={styles.label} style={{ color: 'var(--primary)', display: 'block', textAlign: 'center', marginBottom: '16px' }}>
              PROYECTO - ADMINISTRACIÓN II
            </span>
            
            <h1 className={styles.superTitle}>TLV AI</h1>
            
            <p className={styles.leadText}>
              Transformando la barrera del idioma en un puente digital. 
              <br /><strong>"Traduce aquí y ahora."</strong>
            </p>
            
            <div className={styles.tagGroup}>
              <span className={styles.pill}>Giro: Servicio</span>
              {/* Eliminado: Sector: Terciario (Comercio) */}
              <span className={styles.pill}>Modelo: SaaS</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. EL PROPÓSITO: Misión y Visión (Layout Asimétrico) */}
      {/* MODIFICADO: Usamos compactSection y bgHexagons en lugar de slideSection y bgLight */}
      <section className={`${styles.compactSection} ${styles.bgHexagons}`}>
        <div className={styles.container}>
          {/* MODIFICADO: Agregamos tightHeader para reducir espacio debajo del título */}
          <h2 className={`${styles.sectionHeader} ${styles.tightHeader}`}>Nuestra Brújula</h2>
          <div className={styles.bentoGrid}>
            
            <div className={`${styles.card} ${styles.missionCard}`}>
              <FiTarget size={48} style={{ marginBottom: 24, opacity: 0.9 }} />
              <h3>Misión</h3>
              <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                Desarrollar software de traducción y adaptación de contenido multimedia en tiempo real, 
                potenciado por la precisión de la Inteligencia Artificial.
              </p>
            </div>

            <div className={`${styles.card} ${styles.visionCard}`}>
              <FiEye size={48} color="var(--primary)" style={{ marginBottom: 24 }} />
              <h3>Visión</h3>
              <p style={{ fontSize: '1.1rem' }}>
                Ser la herramienta estándar para usuarios y creadores, democratizando 
                la comprensión universal del contenido digital.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PRODUCTO Y VALORES */}
      {/* MODIFICADO: Usamos ultraCompactSection en lugar de slideSection */}
      <section className={styles.ultraCompactSection}>
        <div className={styles.container}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            
            {/* Columna Izquierda: Producto */}
            <div>
              {/* MODIFICADO: Agregamos productHeader para centrar título y adorno */}
              <h2 className={`${styles.sectionHeader} ${styles.productHeader}`}>El Producto</h2>
              <div className={styles.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <FiBox size={32} color="var(--primary)" />
                  <h3 style={{ margin: 0 }}>Software Desktop</h3>
                </div>
                <p>
                  Aplicación nativa de alto rendimiento para traducción de audio, 
                  video y texto. Sin latencia, sin intermediarios.
                </p>
                <div className={styles.tagGroup} style={{ justifyContent: 'flex-start' }}>
                  <span className={styles.pill}>IA Generativa</span>
                  <span className={styles.pill}>Tiempo Real</span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Valores */}
            <div>
              {/* MODIFICADO: Título centrado y más grande */}
              <h3 className={`${styles.columnTitle} ${styles.valuesTitle}`}>Valores Fundamentales</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: <FiAward />, text: 'Calidad' },
                  { icon: <FiActivity />, text: 'Innovación' },
                  { icon: <FiUsers />, text: 'Adaptabilidad' },
                  { icon: <FiShield />, text: 'Simplicidad' },
                ].map((val, i) => (
                  <div key={i} style={{ 
                    display: 'flex', alignItems: 'center', gap: 16, 
                    padding: '16px', background: 'white', borderRadius: 8,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <span style={{ color: 'var(--primary)' }}>{val.icon}</span>
                    <span style={{ fontWeight: 600 }}>{val.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FINANZAS: Los números importan */}
      {/* MODIFICADO: Usamos financeSectionCompact */}
      <section className={styles.financeSectionCompact}>
        <div className={styles.container}>
          
          {/* MODIFICADO: Título más grande */}
          <h2 className={styles.financeTitleBig}>Viabilidad Financiera</h2>
          
          <p style={{ color: '#E2E8F0', maxWidth: 600, marginBottom: '32px' }}>
            Estructura de costos optimizada para el desarrollo "In-House" y escalabilidad rápida.
          </p>

          <div className={styles.financeGrid}>
            {/* MODIFICADO: Usamos financeCardSmall */}
            <div className={styles.financeCardSmall}>
              <span className={styles.label}>Inversión Inicial</span>
              <span className={styles.bigNumber}>$26,800</span>
              <span style={{ color: '#718096' }}>MXN (Desarrollo & Legal)</span>
            </div>
            
            {/* MODIFICADO: Usamos financeCardSmall */}
            <div className={styles.financeCardSmall}>
              <span className={styles.label}>Suscripción Mensual</span>
              <span className={styles.bigNumber}>$69</span>
              <span style={{ color: '#718096' }}>MXN / Usuario</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ESTRATEGIA DE MERCADO (Nueva Sección) */}
      <section className={styles.marketSection}>
        <div className={styles.container}>
          
          {/* Header Centrado */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className={styles.sectionHeader} style={{ marginBottom: 16 }}>Estrategia de Mercado</h2>
            <p style={{ maxWidth: 600, margin: '0 auto', color: '#718096' }}>
              Un enfoque digital que maximiza el alcance digital manteniendo una operación eficiente.
            </p>
          </div>

          <div className={styles.marketGrid}>
            
            {/* PLAZA (1/3 del ancho) */}
            <div className={styles.plazaCard}>
              <FiGlobe size={48} style={{ marginBottom: 24, opacity: 0.9 }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Plaza Digital</h3>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6 }}>
                Distribución global vía Web & Desktop App. 
                <br /><br />
                <strong>Desarrollo In-House</strong> para control total de calidad.
              </p>
            </div>

            {/* PROMOCIÓN (2/3 del ancho - Prioridad Visual) */}
            <div className={styles.promoCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <FiTrendingUp size={28} color="var(--secondary)" />
                <h3 style={{ fontSize: '1.5rem', color: '#2D3748', margin: 0 }}>Estrategias de Promoción</h3>
              </div>
              
              <div className={styles.promoTagGrid}>

                <span className={styles.promoTag}>📱 Redes Sociales Activas</span>
                <span className={styles.promoTag}>💻 Versiones Demo Gratuitas</span>
                <span className={styles.promoTag}>🚀 Campaña en Kickstarter</span>
                <span className={styles.promoTag}>🎄 Ofertas po Temporada (Navidad)</span>
                <span className={styles.promoTag}>💎 Descuentos Suscripción Anual</span>
                <span className={styles.promoTag}>📺 Ads: YouTube & Spotify</span>
                <span className={styles.promoTag}>🎵 Amazon Music Ads</span>
                <span className={styles.promoTag}>🎧 Podcast Sponsorships</span>
                <span className={styles.promoTag}>🐶 Mascota de Marca (Branding)</span>
                <span className={styles.promoTag}>🔍 SEO & Búsqueda Google</span>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. ANÁLISIS ESTRATÉGICO */}
      <section className={`${styles.slideSection} ${styles.bgLight}`}>
        <div className={styles.container}>

          {/* MODIFICADO: Título más grande, centrado y separado */}
          <h2 className={styles.fodaHeaderBig}>Análisis Estratégico (FODA)</h2>
          
          {/* TU TABLA ORIGINAL (Intacta) */}
          <div className={styles.fodaContainer}>
            {/* Fortalezas */}
            <div className={styles.fodaQuad}>
              <div className={styles.fodaTitle}><FiTrendingUp /> Fortalezas</div>
              <p>Innovación tecnológica y distinción clara frente a apps tradicionales.</p>
            </div>
            
            {/* Oportunidades */}
            <div className={styles.fodaQuad}>
              <div className={styles.fodaTitle} style={{ color: '#4299E1' }}><FiGlobe /> Oportunidades</div>
              <p>Expansión mediante modismos locales y adaptación a todas las variaciones lingüísticas.</p>
            </div>

            {/* Debilidades */}
            <div className={styles.fodaQuad}>
              <div className={styles.fodaTitle} style={{ color: '#ED8936' }}><FiActivity /> Debilidades</div>
              <p>Dependencia tecnológica y posibles bugs en etapas tempranas.</p>
            </div>

            {/* Amenazas */}
            <div className={styles.fodaQuad}>
              <div className={styles.fodaTitle} style={{ color: '#F56565' }}><FiShield /> Amenazas</div>
              <p>Rápida evolución de competidores globales en el sector de IA.</p>
            </div>
          </div>

          {/* NUEVO: Bloque de Sector Económico (Resumido y Estético) */}
          <div className={styles.sectorBox}>
            <span className={styles.sectorBadge}>Sector Económico: Terciario (Comercio)</span>
            <p className={styles.sectorText}>
              Operamos como un servicio digital inmediato. Nuestra disponibilidad es instantánea 
              (On-Demand) para la adquisición y uso por parte de clientes y usuarios globales.
            </p>
          </div>
        </div>
      </section>

      {/* 7. GESTIÓN DE TALENTO Y CONTINGENCIAS (Fondo Oscuro) */}
      <section className={styles.darkSection}>
        <div className={styles.container}>
          
          {/* SUB-SECCIÓN: TALENTO HUMANO */}
          <div className={styles.talentGrid}>
            {/* Columna Izquierda: Estrategia */}
            <div>
              <h2 className={styles.sectionHeader} style={{ color: 'white' }}>Gestión de Talento</h2>
              <ul className={styles.checkList}>
                <li className={styles.checkListItem}>
                  <div className={styles.iconCircle}><FiUserCheck /></div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem' }}>Reclutamiento de Precisión</strong>
                    <p style={{ color: '#A0AEC0', margin: '4px 0 0 0' }}>Campañas dirigidas específicamente a áreas de especialidad técnica y lingüística.</p>
                  </div>
                </li>
                <li className={styles.checkListItem}>
                  <div className={styles.iconCircle}><FiHeart /></div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem' }}>Cultura y Comunicación</strong>
                    <p style={{ color: '#A0AEC0', margin: '4px 0 0 0' }}>Claridad total en la oferta de valor. Beneficios únicos que nos diferencian de la competencia.</p>
                  </div>
                </li>
                <li className={styles.checkListItem}>
                  <div className={styles.iconCircle}><FiBookOpen /></div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem' }}>Alianzas Universitarias</strong>
                    <p style={{ color: '#A0AEC0', margin: '4px 0 0 0' }}>Convenios estratégicos para captar talento joven y fresco.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Columna Derecha: Grid de Capacitaciones */}
            <div>
              <h3 style={{ marginBottom: 24, opacity: 0.9 }}>Plan de Capacitación</h3>
              <div className={styles.skillsGrid}>
                <div className={styles.skillCard}>
                  <span className={styles.skillTitle}>Expansión</span>
                  Idiomas extranjeros para alcance global.
                </div>
                <div className={styles.skillCard}>
                  <span className={styles.skillTitle}>Técnica</span>
                  <FiCpu style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Manejo de software especializado.
                </div>
                <div className={styles.skillCard}>
                  <span className={styles.skillTitle}>Soft Skills</span>
                  <FiSmile style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Inteligencia emocional aplicada.
                </div>
                <div className={styles.skillCard}>
                  <span className={styles.skillTitle}>Gestión</span>
                  Habilidades de liderazgo.
                </div>
              </div>
            </div>
          </div>

          {/* SUB-SECCIÓN: APOYOS Y CONTINGENCIAS */}
          <h2 className={styles.sectionHeader} style={{ color: 'white', marginTop: 0 }}>Apoyos y Contingencias</h2>
          <div className={styles.resilienceGrid}>
            
            {/* Tarjeta Apoyos */}
            <div className={styles.resilienceCard}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <FiBookOpen size={24} color="var(--primary)" />
                Alianzas Educativas
              </h3>
              <p style={{ color: '#CBD5E0', lineHeight: 1.6 }}>
                Estrategia de penetración mediante convenios con escuelas públicas y privadas:
              </p>
              <ul style={{ paddingLeft: 20, color: '#E2E8F0', marginTop: 12 }}>
                <li style={{ marginBottom: 8 }}><strong>1er Mes Gratuito</strong> para instituciones aliadas.</li>
                <li><strong>Descuento Estudiante</strong> permanente para fomentar la base de usuarios.</li>
              </ul>
            </div>

            {/* Tarjeta Contingencias */}
            <div className={styles.resilienceCard} style={{ borderLeftColor: '#48BB78' }}> {/* Verde para "Seguro" */}
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <FiShield size={24} color="#48BB78" />
                Blindaje ante Pandemias
              </h3>
              <p style={{ color: '#E2E8F0', marginTop: 12 }}>
                Nuestra operatividad no se ve afectada por restricciones físicas. De hecho, en escenarios de aislamiento, 
                la demanda de consumo digital y herramientas de comunicación aumenta, convirtiendo una amenaza global en una fortaleza operativa.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
};