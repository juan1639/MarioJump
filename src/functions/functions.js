import { Settings } from "../scenes/settings";
import { Textos } from "../components/textos";

function colliderJugadorPlataformas(jugador, plataforma)
{
  // console.log(jugador, puntitos);
}

function exceptoDesdeAbajo(jugador, plataforma)
{
  if (jugador.body.velocity.y < 0)
  {
    return false;
  }
  return true;
}

function particulas(x, y, particula, vel, span, size, color, sprite, bool, scene)
{
  const partis = scene.add.particles(x, y, particula, {
    speed: vel,
    lifespan: span,
    scale: size,
    tint: color,
    // gravityY: 200
    blendMode: 'ADD'
  });

  partis.setDepth(Settings.DEPTH.efectos);

  if (bool) partis.startFollow(sprite);
}

function suma_puntos(puntos, scene)
{
  const bonus = Settings.getPuntos() + puntos.getData('puntos');
  Settings.setPuntos(bonus);
  scene.marcadorPtos.update(Settings.getTxtScore(), Settings.getPuntos());
  // console.log(bonus, Settings.getPuntos());
}

function restar_vida()
{
  const actualizar = Settings.getVidas() - 1;
  Settings.setVidas(actualizar);
}

function play_sonidos(id, loop, volumen)
{
  id.volume = volumen;
  id.loop = loop;
  id.play();
}

export {
  colliderJugadorPlataformas,
  exceptoDesdeAbajo,
  particulas,
  play_sonidos
};
