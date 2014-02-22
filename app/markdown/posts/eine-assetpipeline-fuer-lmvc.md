# Eine Asset Pipeline für LMVC

Vor langer Zeit, als es noch warm war, hatte Tobi das Glück 8 Wochen bei der [Scandio](http://scandio.de) in München ein Sommerpraktikum machen zu können. Riesen Spaß ich hatte ich dabei beim Knöstern an Scandios Open Source Projekten auf [Github](https://github.com/scandio). Dabei entstand zum einen die hier im Detail erklärte Asset Pipeline und die schon erwähnte [scandiojs](scandiojs)-Bibliothek.

## Worum es hier geht

Die LMVC-Modules bekamen mit der ersten Version einer Asset Pipeline Zuwachs. Die grundlegende Idee ist einfach: Assets unterschiedlicher Natur (JavaScript, CSS, Sass, CoffeeScript, Markdown oder auch Bilder) sollen über eine einheitliche Schnittstelle in LMVC zugreifbar gemacht werden. Hierbei müssen natürlich die verschiedenen Assettypen auch unterschiedlich verarbeitet werden, bevor sie direkt im Browser eingebunden werden können. So muss Sass, Less und CoffeeScript zunächst in CSS und JavaScript kompiliert werden, wohingegen JavaScript und CSS selbst zur Komprimierung noch minifiziert werden können.

LMVC ist ein Mini Framework für MVC Applikationen, das hier [auf GitHub](https://github.com/scandio/lmvc) gehostet wird. Mit LMVC lassen sich schnell kleinere exemplarische Webanwendungen entwickeln und MVC erklären. Über die Zeit ist LMVC nun immer mehr gewachsen und lässt sich mit den [https://github.com/scandio/lmvc-modules](LMVC-Modules) erweitern.

## LMVC-Modules und die neue Asset Pipeline

Die Module stellen dabei einfach einsetzbare Abstraktionen häufiger Anwendungsfälle dar. So können zum Beispiel mit dem [Formular Modul](https://github.com/scandio/lmvc-modules/tree/master/lib/Scandio/lmvc/modules/form) leicht Formulare validiert und Fehlermeldungen ausgegeben werden. Über das [Security Modul](https://github.com/scandio/lmvc-modules/tree/master/lib/Scandio/lmvc/modules/security) sind auch Anbindungen an einen Ldap-Verzeichnisdienst, Konfigurationsdateien im Json-Format oder eine Datenbank für die Benutzerverwaltung möglich.

Bilder hingegen bieten neben der einfachen Skalierung ein noch viel weiteres Feld an Manipulationsmöglichkeiten wie Farbanpassungen, das Zuschneiden und vieles mehr. Damit stellen sie eine besondere Herausforderung dar und grenzen auch gleichzeitig die sinnvollen Anwendungsgebiete ein.

## Das Rad: bestehende Asset Pipelines

Moderene Web Frameworks wie [Rails](http://guides.rubyonrails.org/asset_pipeline.html) bieten mit einer bestehenden Pipeline durch [Sprockets Rails](https://github.com/rails/sprockets-rails) viele den Entwicklungsprozess vereinfachende Hilfestellungen. Dazu gehört eben das Kompilieren nahezu jeglicher Template- und Metasprache von CSS und JavaScript. Auch lassen sich wenn möglich Assets minifizieren und konkatenieren und Fingerprinten, bei welchem dem Dateinamen der Sha1-Hash des Inhalts (`styles-908e25f4bf641868d8683022a5b62f54.css`) angehängt wird.

Damit können HTTP-Header so gesetzt werden, dass das Caching des Browsers forciert wird, wobei es keine Rolle spielt von welchem Server (z.B. CDN) die Ressource angeliefert wird.

Zur Abfrage der Assets bietet Rails zwei Ansätze: Suchpfade und Manifest-Dateien. Mit Suchpfaden muss der Pfad zu einer Ressource nicht vollständig angegeben werden, lediglich der Dateiname reicht aus solange dieser eindeutig ist. Sind solche Suchpfade beispielsweise auf `/vendor`, `/lib` und `/assets` gelegt kann `jquery-2.0.3.js` und `jquery.slider.js` angefragt werden, obwohl sich diese unter `/lib` und `/vendor/slider` befinden.

In Manifest-Dateien hingegen lassen sich einfach mehrere Assets listen. Beinhaltet `admin.js` als Manifest Referenzen auf `jquery-2.0.3.js`, `backbone.js` und `jquery.adminpanel.js` werden diese drei bei der Anfrage von `admin.js` automatisch konkateniert ausgeliefert.

Schlussendlich können die Assets dann einfach über Include-Tags in Views eingebunden werden, wobei der Pfad automatisch aufgelöst wird.

PHP Frameworks bieten Unterschiedliches. [FuelPHP](http://fuelphp.com/docs/classes/asset/config.html) beispielsweise bietet an dieser Stelle weniger Unterstützung an. Dort können lediglich Pfade der Assets definiert werden, die automatisch überprüft werden um dann das entsprechende HTML-Tag über eine Hilfsmethode auszugeben.

[Symfony und Assetic](http://symfony.com/doc/current/cookbook/assetic/asset_management.html) hingegen ermöglichen schon einiges mehr. Dort lassen sich im Template dynamisch Pfade zu kompilierten und auch konkatenieren Assets generieren. Dazu können auch eigene Filter installiert und angegeben werden. Zur JavaScript-Minifizierung lässt sich so nach Vorliebe [UglifyJS2](https://github.com/mishoo/UglifyJS2) oder der [YUI-Compressor](http://yui.github.io/yuicompressor/) verwenden. Um den Filter nicht in jedem einzelnen Template angeben zu müssen, kann dieser auch automatisch auf die Dateiendung gelegt werden. Womit sich beispielsweise Sass- und CoffeeScript Dateien automatisch kompilieren lassen. Auch das ständige neu kompilieren lässt sich je nach Stage unterbinden.

Letztendlich hat sich LMVCs Asset Pipeline von all diesen Herangehensweisen ein wenig inspirieren lassen, stellt aber vielmehr einen eigenen Versuch dar und folgt den Konzepten von LMVC.

## Ein Umweg: Package Manager und Build Tools

Neben Asset Pipelines bieten momentan viele speziell für die Webentwicklung zugeschnittenen Build-Tools wie z.B. [GruntJS](http://gruntjs.com) einer Pipeline ähnliche Arbeitsabläufe an.

GruntJS ist ein auf [NodeJS](http://nodejs.org) und via [NPM](npmjs.org) verfügbares Buildtool. Ein `Gruntfile.js` enthält dabei eine genaue Spezifikation und Zuordnung der Aufgaben für die Verarbeitung eines Sets an Ressourcen für den gesamten oder Teilausschnittes des Buildprozesses.

Dadurch lässt sich genau definieren welche Dateien beim Aufruf von beispielsweise `grunt dist-js` zusammengefügt, minifiziert und wohin abgelegt werden sollen. In Kombination mit einem `watch-task` lässt sich der Buildprozess dann völlig automatisiert in die Entwicklung integrieren.

Unten stehend: ein `Gruntfile.js`, welches drei JavaScript- und zwei CSS-Dateien zusammenfügt und mithilfe des [ClosureCompilers](https://developers.google.com/closure/compiler/) beziehungsweise dem [css-min Plugin](https://github.com/jzaefferer/grunt-css) minifiziert.

<script src="https://gist.github.com/tdeekens/c07b634dd7c441abf377.js"></script>

Die Vielfalt an vordefinierten [Grunt-Plugins](http://gruntjs.com/plugins) kennt dabei kaum Grenzen und erstreckt sich von den Standardaufgaben über Bildoptimierungen bis hin zur automatischen [Changelog-Generierung](https://github.com/btford/grunt-conventional-changelog) aus den letzten Git-Commits.

Allerdings birgt ein `Gruntfile.js` trotz der Menge an verfügbaren Tasks Komplexität die nicht immer erwünscht ist. Insbesondere in der Entwicklungsphase macht es wenig Sinn immer den gesamten Buildprozess bei jeder Änderung zu durchlaufen. Was zwangsläufig zu einem Mehr an Tasks und Komplexität führt. Auch wenn mehrere “Teil-Resourcen” für die unterschiedlichen Kontexte einer Anwendung generiert werden müssen steigt die Größe der Builddatei. Weiterhin unterscheiden sich die Include-Tags im HTML-Code schnell zwischen Entwicklungs- und Livesystem.

Letztendlich lässt sich der Nutzen von Grunt natürlich nicht gänzlich verneinen, es sollte jedoch genau bedacht werden, wann und wozu es sinnvoll eingesetzt werden kann.

Zusätzlich hat sich in jüngster Vergangenheit immer mehr [Bower](http://bower.io) als Packet Manager für Webanwendungen etabliert. Dazu lassen sich über [Bower Components](http://sindresorhus.com/bower-components/) ~2900 Komponenten finden und automatisch in ein Projekt laden. Die Abhängigkeiten sind in einer `bower.json` Datei spezifiziert und lassen sich über ein `bower install` in das im `.bowerrc` angegebene Verzeichnis laden. Abhängigkeiten können auch nachträglich einfach über `bower install &lt;package&gt;#&lt;version&gt; --save` geladen und ins `bower.json` persistiert werden.

Bower übernimmt also den sonst manuellen Download von Libraries und erlaubt zusätzlich das einfache Springen zwischen Versionen. So lässt sich in eine Anwendung schnell eine beispielsweise ältere Version von jQuery laden, ohne dass der Programmierer selbst auf die Suche nach der Ressource gehen muss.

Unten stehend: eine beispielhafte `bower.json` Datei, die jQuery, jQuery-Plugins als auch die Sass-Library [Bourbon](http://bourbon.io/) und [Neat](http://neat.bourbon.io) als Abhängigkeiten spezifiziert.

<script src="https://gist.github.com/tdeekens/82cb204ec7ab23095c3e.js"></script>

Als Entwickler fragt man sich nach einem Tag mit Bower schnell, wie man vorher jemals ohne zurecht kam. Dennoch werden Assets unterschiedlichen Typs in ein Verzeichnis geladen und zum anderen ist die interne Verzeichnisstruktur jeder Abhängigkeit unterschiedlich. So befindet sich Bourbon unter `components/bourbon/app/assets/stylesheets/_bourbon.scss` und jQuery direkt unter `components/jquery.js`. Dies sollte man für die Asset Pipeline im Hinterkopf zu behalten.

Für Grunt als auch Bower stellt sich für die Asset Pipeline also die Frage wie sie sich möglichst agnostisch nutzen lässt ohne den Gebrauch eines der beiden Tools zu verbieten.

## Die Zielgerade: Das Konzept

Der erste Grundgedanke ist, alle Ressourcen über einfach lesbare URLs zugreifbar zu machen. Somit sollte eine Abfrage nach `assetpipeline/sass/styles.scss` automatisch die gewünschte und kompilierte Version des Stylesheets zurückliefern. Selbiges gilt natürlich für CSS, JavaScript und CoffeeScript. Demnach liefert `assetpipeline/coffee/min/plugin.coffee` eine minifizierte und zu JavaScript kompilierte Version des Plugins. Dabei handelt es sich bei `coffee` und `sass` jeweils um eine Pipe. Also ein spezieller Teil der Anwendung welche sich um die Verarbeitung der Ressource kümmert.

Manifest-Dateien wie in Rails und der Anstoß der Konkatenation und Minifizierung über Templates wie in Symfony schien für die erste Version von LMVCs Pipeline dabei nicht sinnvoll.

Dennoch muss auch über eine URL mehr als nur eine Datei angefordert werden können. Die Abfrage mehrerer Dateien in einem HTTP-Request liefert im Endeffekt wie erwartet nur eine Datei. Dateien lassen sich dabei einfach wie über `assetpipeline/jquery.js+plugin1.js+plugin2.js` als Liste angeben. Schlussendlich werden so TCP-Roundtrips vermindert und die Anwendung kann schneller geladen werden.

Sollen automatisch alle Assets eines Verzeichnisses an eine Pipe übergeben und von ihr verarbeitet werden kann einfach der Name des Verzeichnisses übergeben werden. Der Aufruf von `assetpipeline/sass/admin` und `assetpipeline/js/admin` würde demnach alle Ressourcen direkt unter `/admin` des jeweiligen Pipe-Hauptverzeichnisses laden und zurückgeben. Dadurch lassen sich leicht vom Anwendungskontext abhängige Ressourcen nur nach Bedarf laden.

Handelt es sich nun aber nicht um ein selbst geschriebenes Code-Schnipsel, sondern ein eben über Bower hinzugefügtes Plugin oder Library, sollte auch diese Datei ohne weiteren Aufwand gefunden werden. Dazu lassen sich pro Pipe mehrere alternative Suchpfade definieren, die automatisch rekursiv durchsucht werden, sobald die Ressource im Hauptverzeichnis nicht gefunden wird. Im Falle von Bower kann für die JavaScript- und Sass-Pipe einfach `/components` als höchstliegenden Suchpfad definiert werden. Von dort ausgehend werden dann entsprechende Assets gesucht und gefunden.

Neben den üblichen text-basierten Dateien lassen sich als Experiment auch Bilder über ähnliche Anfragen automatisch laden und skalieren. Der Aufruf von `assetpipeline/img/bild.png?w=800&amp;h=600` skaliert das Bild automatisch, ohne dass dieses vorher in der Größe abgelegt worden sein muss. In Folge dessen kann immer die Ausgangsversion der Datei abgelegt werden, aus welcher dann nach Bedarf die Ansichten gerechnet werden können. Diese Pipe benötigt allerdings noch Arbeit und kann bis ins schier Unendliche erweitert werden.

Mit all dem ist natürlich ein wenig Rechnenaufwand verbunden, insbesondere da dieser im schlechtesten Fall pro Anfrage anfällt. Damit nicht gleich der gewonnene Vorteil der Konkatenation und Minifizierung wieder verloren geht, sollten daher bereits verarbeitete Dateien nicht bei jeder Anfrage erneut verarbeitet werden, sondern gecacht werden.

Sobald sich dann allerdings eine Datei einer “Sammlung” ändert, müssen alle erneut verarbeitet und im Cache erneuert werden. All dies verhält sich allerdings für alle Resource-Typen gleich, wohingegen nur die speziellen Optionen Pipe-spezifisch sind (wie Größenangaben oder ein Minifizierungswunsch). Jedes Hauptverzeichnis einer Pipe enthält ein dafür konfigurierbares (standardmäßig *_cache*) Unterverzeichnis zur Ablage. Im Entwicklungsmodus werden bei jeder Anfrage die Änderungszeitstempel der angefragten mit der gecachten Datei verglichen um die Notwendigkeit einer Neuverarbeitung festzustellen. Wird die Pipeline in den Produktionsmodus geschaltet entfallen die Vergleiche aus Geschwindigkeitsgründen.

Wichtig für die Asset Pipeline war insbesondere ihre Erweiterbarkeit. Wie bereits erwähnt ist ein Großteil der Logik für alle Pipes gleich und nur die abschließende Bearbeitung der Ressource hängt von ihrem Typ ab. Daher braucht es für das Hinzufügen beispielsweise einer [Mustache](http://mustache.github.io) Template verarbeitenden Pipe nur eine neue Klasse, die die [AbstractAssetPipe](https://github.com/scandio/lmvc-modules/blob/master/lib/Scandio/lmvc/modules/assetpipeline/assetpipes/AbstractAssetPipe.php) erweitert um die ´process($asset, $options)´-Funktion zu implementieren.

Die schlussendliche Verarbeitung einer Anfrage durch die Pipe kann auf vielen Wegen erfolgen. Momentan nutzen alle Pipes ein passendes über [Composer](composer.org) eingebundenes und [Packagist](packagist.org) gefundenes Modul. Denkbar ist aber auch der Aufruf eines Binaries wie dem offiziellen [Sass gem](http://sass-lang.com) oder dem [CoffeeScript NPM-Modul](http://coffeescript.org).

## Schlanke Responses dank 304-Caching

Die Pipelines erlauben also auch mehr Kontrolle über die Verarbeitung eines Anfrage. Diese kann unter anderem für ein *304-Caching* verwendet werden. Mithilfe dessen der gesamte Inhalt einer Anfrage an die Pipeline ausgelassen kann insofern dieser im Cache des Browsers liegt. Der Browser wird dabei dazu aufgefordert dem Asset Pipeline den Zeitstempel seiner im Cache liegenden Datei zu senden. Durch diesen zusätzlichen *conditional request* kann die Asset Pipeline feststellen ob die beim Browser gecachte Version noch aktuell ist oder ausgetauscht werden muss. Davon abhängig setzt die Asset Pipeline den *304-header* und spart damit eventuell das übermitteln des request body. Insbesondere bei größeren Bildern und JavaScript Dateien birgt dies großes Potential für das flottere Laden einer gesamten Seite.

Natürlich lässt sich das Caching über einen Wert in der [config.json](https://github.com/scandio/lmvc-modules/blob/master/lib/Scandio/lmvc/modules/assetpipeline/config.json#L4) steuern.

## Architektur und UML-Diagramm

Keine Angst, das UML-Diagramm dient nur der Veranschaulichung der erwähnten Architektur.

![UML Asset Pipeline](http://www.scandio.de/wp-content/uploads/2014/02/AssetPipe.png)

## Ausprobieren und erweitern

Für alle weiter Interessierte gibt es natürlich eine [readme.md](https://github.com/scandio/lmvc-modules/tree/master/lib/Scandio/lmvc/modules/assetpipeline), die Funktionsweise und Konfiguration noch mal etwas technischer beschreibt.

Neben der Asset Pipeline sind auch weitere Module hinzugekommen. So ein [Modul zur Benutzeranmeldung](https://github.com/scandio/lmvc-modules/tree/master/lib/Scandio/lmvc/modules/registration) eines um [HTML-Tags zu erzeugen](https://github.com/scandio/lmvc-modules/tree/master/lib/Scandio/lmvc/modules/htmltag) und ein [Upload Modul](https://github.com/scandio/lmvc-modules/tree/master/lib/Scandio/lmvc/modules/upload). In Arbeit ist momentan ein [Modul zur Verwaltung der PHP Session](https://github.com/scandio/lmvc-modules/tree/feature/session/lib/Scandio/lmvc/modules/session).

Dazu auch eine [contributing.md](https://github.com/scandio/lmvc-modules/blob/master/lib/Scandio/lmvc/modules/assetpipeline/contributing.md), die Richtlinen für generelle Änderungen und für das Hinzufügen einer eigenen Pipe gibt.

Im Moment arbeiten wir an einer kleinen Beispielanwendung, die von allem Gebrauch macht und vielleicht sogar ein wenig hilfreich ist. Dazu vielleicht später mehr.