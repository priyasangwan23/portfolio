import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────
   Particle constellation + aurora canvas bg
   ───────────────────────────────────────── */
const BackgroundCanvas = () => {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let   raf

    /* ── Resize ── */
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    /* ── Mouse ── */
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    /* ── Particle factory ── */
    const COUNT = 110
    const MAX_DIST = 140

    class Particle {
      constructor () { this.reset(true) }

      reset (randomY = false) {
        this.x  = Math.random() * canvas.width
        this.y  = randomY ? Math.random() * canvas.height : canvas.height + 10
        this.vx = (Math.random() - 0.5) * 0.45
        this.vy = -(0.15 + Math.random() * 0.35)
        this.r  = 0.8 + Math.random() * 2
        // hue cycles through blue → indigo → violet
        this.hue = 215 + Math.random() * 60
        this.alpha = 0.3 + Math.random() * 0.5
        this.life  = 0
        this.maxLife = 400 + Math.random() * 400
      }

      update () {
        /* Mouse repulsion */
        const dx = this.x - mouse.current.x
        const dy = this.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          this.vx += (dx / dist) * force * 0.6
          this.vy += (dy / dist) * force * 0.6
        }

        /* Damping */
        this.vx *= 0.98
        this.vy *= 0.98

        this.x += this.vx
        this.y += this.vy
        this.life++
        this.hue += 0.08

        if (
          this.life > this.maxLife ||
          this.x < -50 || this.x > canvas.width + 50 ||
          this.y < -50
        ) this.reset()
      }

      draw () {
        /* Fade in / out at life edges */
        const progress   = this.life / this.maxLife
        const fadeFactor = progress < 0.08
          ? progress / 0.08
          : progress > 0.92
            ? (1 - progress) / 0.08
            : 1

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue}, 90%, 72%, ${this.alpha * fadeFactor})`
        ctx.fill()

        /* Glow */
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2)
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3)
        g.addColorStop(0, `hsla(${this.hue}, 100%, 80%, ${0.25 * fadeFactor})`)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.fill()
      }
    }

    /* ── Aurora blobs ── */
    const BLOBS = [
      { x: 0.18, y: 0.15, rx: 420, ry: 280, hue: 220, alpha: 0.13, spd: 0.00018 },
      { x: 0.82, y: 0.80, rx: 380, ry: 300, hue: 258, alpha: 0.10, spd: 0.00022 },
      { x: 0.55, y: 0.45, rx: 300, ry: 220, hue: 235, alpha: 0.07, spd: 0.00015 },
      { x: 0.25, y: 0.75, rx: 260, ry: 200, hue: 275, alpha: 0.09, spd: 0.00025 },
    ]
    let t = 0

    const drawAurora = () => {
      BLOBS.forEach(b => {
        const cx = b.x * canvas.width  + Math.sin(t * b.spd * canvas.width)  * 80
        const cy = b.y * canvas.height + Math.cos(t * b.spd * canvas.height) * 60
        const hShift = b.hue + Math.sin(t * 0.0003) * 20

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(b.rx, b.ry))
        g.addColorStop(0,   `hsla(${hShift}, 85%, 60%, ${b.alpha})`)
        g.addColorStop(0.5, `hsla(${hShift + 25}, 80%, 55%, ${b.alpha * 0.4})`)
        g.addColorStop(1,   'transparent')

        ctx.save()
        ctx.scale(1, b.ry / b.rx)
        ctx.beginPath()
        ctx.arc(cx, cy * (b.rx / b.ry), b.rx, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.filter = 'blur(55px)'
        ctx.fill()
        ctx.filter = 'none'
        ctx.restore()
      })
    }

    /* ── Grid ── */
    const drawGrid = () => {
      const CELL = 65
      ctx.strokeStyle = 'rgba(96,165,250,0.028)'
      ctx.lineWidth   = 0.5
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += CELL) {
        ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height)
      }
      for (let y = 0; y < canvas.height; y += CELL) {
        ctx.moveTo(0, y); ctx.lineTo(canvas.width, y)
      }
      ctx.stroke()
    }

    /* ── Shooting stars ── */
    class ShootingStar {
      constructor () { this.spawn() }
      spawn () {
        this.x  = Math.random() * canvas.width * 0.7
        this.y  = Math.random() * canvas.height * 0.4
        this.len  = 120 + Math.random() * 200
        this.spd  = 8 + Math.random() * 10
        this.alpha = 0
        this.fade  = 'in'
        this.vx   = this.spd * 0.82
        this.vy   = this.spd * 0.55
        this.hue  = 215 + Math.random() * 45
        this.trail = []
        this.wait  = Math.random() * 500
        this.tick  = 0
      }
      update () {
        this.tick++
        if (this.tick < this.wait) return
        this.trail.push({ x: this.x, y: this.y })
        if (this.trail.length > 18) this.trail.shift()
        this.x += this.vx
        this.y += this.vy
        if (this.fade === 'in') {
          this.alpha += 0.07
          if (this.alpha >= 1) this.fade = 'out'
        } else {
          this.alpha -= 0.04
        }
        if (this.alpha <= 0 || this.x > canvas.width + 100) this.spawn()
      }
      draw () {
        if (this.tick < this.wait || this.trail.length < 2) return
        for (let i = 1; i < this.trail.length; i++) {
          const p = i / this.trail.length
          ctx.beginPath()
          ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y)
          ctx.lineTo(this.trail[i].x, this.trail[i].y)
          ctx.strokeStyle = `hsla(${this.hue}, 90%, 85%, ${p * this.alpha * 0.9})`
          ctx.lineWidth = p * 2.5
          ctx.stroke()
        }
      }
    }

    /* ── Mouse halo ── */
    const drawMouseHalo = () => {
      const { x, y } = mouse.current
      if (x < 0) return
      const r = 160 + Math.sin(t * 0.02) * 20
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0,   'rgba(96,165,250,0.06)')
      g.addColorStop(0.5, 'rgba(129,140,248,0.03)')
      g.addColorStop(1,   'transparent')
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
    }

    /* ── Connection lines between particles ── */
    const particles = Array.from({ length: COUNT }, () => new Particle())
    const shooters  = Array.from({ length: 4 }, () => new ShootingStar())

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const op = (1 - d / MAX_DIST) * 0.35
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 80%, 70%, ${op})`
            ctx.lineWidth = (1 - d / MAX_DIST) * 1.2
            ctx.stroke()
          }
        }
      }
    }

    /* ── Render loop ── */
    const render = () => {
      t++

      /* Deep space base */
      ctx.fillStyle = 'rgba(4, 4, 12, 0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawAurora()
      drawGrid()
      drawMouseHalo()
      drawConnections()
      particles.forEach(p => { p.update(); p.draw() })
      shooters.forEach(s  => { s.update(); s.draw() })

      raf = requestAnimationFrame(render)
    }

    /* First frame: paint solid base so there's no flash */
    ctx.fillStyle = '#04040c'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  )
}

export default BackgroundCanvas
