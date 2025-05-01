# htmlcan/htmltocanvas (HTML to Canvas)

HTML-Knoten auf canva-Element rendern, z. B. für WebGL-Texturen.

## Vorschau
Beispiel (Chrome/Firefox): oben auf graues canvas-Element gerendert, darunter das originale HTML

![Vergleich Canvas vs. HTML](https://raw.githubusercontent.com/polygontwist/htmlcan/refs/heads/main/screenshot.png)

## Funktionsweise
Das Skript analysiert HTML-Elemente und überträgt deren Stileigenschaften auf ein Canvas-Element. 
Dabei werden unter anderem folgende Attribute berücksichtigt:

- Position und Größe
- Hintergrundfarbe
- Textfarbe und Schriftart
- Eckenabrundung
- Bilder

Auch klassische `<input>`-Elemente werden gerendert, allerdings ohne Interaktionsmöglichkeiten. Interaktionsmöglichkeiten müssten zusätzlich implementiert werden.
Das Script gibt dazu u.a. eine Liste von A- und BUTTON-Elementen zurück.

## Einschränkungen
- das HTML muss vom Browser gerendert sein, ein display:none; funktioniert nicht
- ⚠️ **Hinweis:** Das Skript funktioniert nur, wenn es von einem Server aus geladen wird.
- ggf. muss beim direkten Aufruf auf nachzuladenen Fonts gewartet werden

## Änderungen in Version 2
- Code-Optimierung
- Unterstützung für Textausrichtung mit `text-align:`
- Unterstützung für `padding`
- Unterstützung für Elemente mit `:before`, z. B. Font-Icons

## Änderungen in Version 3
- Unterstützung für border inkl. border-radius, Farbe und Dicke

## Änderungen in Version 4
- Korrekturen
- Modus zum erstellen einer Alphamap
- Rückgabe der Klickbereiche (A-Tags + A-Knoten)

## Änderungen in Version 5
- Unterstützung für "center" bei justifyContent und alignItems bei Textpositionierung

## Änderungen in Version 6
- bessere Textpositionierung bei Flex
 
## Änderungen in Version 7
- neben A- werden auch BUTTON-Klickbereiche zurückgegeben

## Änderungen in Version 8
- CANVAS-Elemente werden auch gezeichnet


## Schriftart-Quelle
- **URL:** [IcoMoon](https://icomoon.io/#icons-icomoon)
- **Designer:** Keyamoon
- **Lizenz:** GPL oder CC BY 4.0

---

### Installation & Nutzung
1. Stelle sicher, dass das Skript über einen Server bereitgestellt wird.
2. Binde das Skript in deine HTML-Datei ein.
3. Rufe die `htmlcan`-Funktion mit dem gewünschten HTML-Element nach dem laden auf.

```js
	<script type="module">
		import { htmltocanvas } from './script.js';	

		const setup=function(){
			htmltocanvas({
			"canvas":document.getElementById("zielcanvas"),
			"quelle":document.getElementById("quellhtml")
			//,"autosize":true  //canvas auf nächste passende Textur-Größe setzen (64,128,256,512,1024,2048)
			//,"autoscale":true //Zeichnung auf volle canvas-Größe scalieren
			});
		}

		window.addEventListener('load',function(e){setup()});
		
	</script>
```

## Lizenz
Dieses Projekt steht unter der **MIT-Lizenz**. Siehe die Datei `LICENSE` für weitere Informationen.

---

_Feedback und Beiträge sind willkommen!_ 🚀

