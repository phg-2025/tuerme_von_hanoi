/**
 * Die Türme von Hanoi
 * 
 * Taste A: Aktion wechseln
 * 
 * Taste B: Aktion ausführen
 * 
 * Taste A+B: Automatischer Ablauf (Lösung)
 * 
 * Näheres bei Wikipedia oder demnächst bei 
 * 
 * https://www.prof-horst-guenther.de/calliope
 * 
 * 27.4.2026
 */
function zeige_Kopf () {
    von_Turm = job_Aktion[job] / 10
    von_Turm = Math.floor(von_Turm)
    nach_Turm = job_Aktion[job] % 10
    if (job == 3 || job == 5) {
        pos = 5
    } else {
        pos = 0
    }
    txt = job_Linie[job]
    write_xy(1, pos, txt)
    txt = "" + chr2(von_Turm) + " nach " + chr2(nach_Turm)
    write_xy(7, 0, txt)
}
function write_xy (z: number, s: number, Text: string) {
    oledssd1306.setTextXY(z, s)
    oledssd1306.writeString(Text)
}
function lösche_Scheibe (Turm: number[]) {
    Scheibe = Turm[0]
    splt = von_Turm * 5
    zl = 6 - Turm.length
    oledssd1306.setTextXY(zl, splt)
    oledssd1306.clearRange(5)
}
function hanoi (n: number, start: number, ziel: number, hilf: number) {
    if (n == 0) {
        return
    }
    hanoi(n - 1, start, hilf, ziel)
    von_Turm = start
    nach_Turm = ziel
    holeTurm(start)
    Scheibe = Turm3[0]
    verschiebe()
    basic.pause(800)
    hanoi(n - 1, hilf, ziel, start)
}
function Turm_Namen () {
    write_xy(0, 0, "A")
    write_xy(0, 5, "B")
    write_xy(0, 10, "C")
}
function verschiebe () {
    if (nach_Turm == 0) {
        einfügen_Scheibe(A)
        A.unshift(Scheibe)
    } else if (nach_Turm == 1) {
        einfügen_Scheibe(B)
        B.unshift(Scheibe)
    } else {
        einfügen_Scheibe(C)
        C.unshift(Scheibe)
    }
    if (von_Turm == 0) {
        lösche_Scheibe(A)
        A.shift()
    } else if (von_Turm == 1) {
        lösche_Scheibe(B)
        B.shift()
    } else {
        lösche_Scheibe(C)
        C.shift()
    }
    zug += 1
}
function holeTurm (TNr2: number) {
    if (TNr2 == 0) {
        Turm3 = A
    } else if (TNr2 == 1) {
        Turm3 = B
    } else {
        Turm3 = C
    }
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (Start == 0) {
        Scheiben_Zahl = 3
        Start = 1
        oledssd1306.clearDisplay()
        Turm_Namen()
        zeige_Kopf()
        Zeige_Turm_0()
    } else {
        oledssd1306.setTextXY(1, 0)
        oledssd1306.clearRange(16)
        oledssd1306.setTextXY(7, 0)
        oledssd1306.clearRange(16)
        job += 1
        job = job % 6
        von_Turm = Jobs[job] / 10
        von_Turm = Math.floor(von_Turm)
        zeige_Kopf()
    }
})
function zeige_Scheibe (nr: number) {
    Sch = ""
    j = 0
    while (j <= prev(nr)) {
        // Scheibe mit oderr ohne Nummer
        if (j == 0 && false) {
            Sch = "" + Sch + ("" + nr)
        } else {
            Sch = "" + Sch + "="
        }
        j += 1
    }
    oledssd1306.writeString(Sch)
}
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    oledssd1306.clearDisplay()
    zug = 0
    Turm_Namen()
    Zeige_Turm_0()
    hanoi(Scheiben_Zahl, 0, 1, 2)
    oledssd1306.setTextXY(7, 0)
    oledssd1306.writeString("Fertig " + zug + " Züge")
})
function einfügen_Scheibe (Turm2: any[]) {
    splt = nach_Turm * 5
    zl = 5 - Turm2.length
    oledssd1306.setTextXY(zl, splt)
    zeige_Scheibe(Scheibe)
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (Start == 0) {
        A.push(4)
        Scheiben_Zahl = 4
        Start = 1
        oledssd1306.clearDisplay()
        Turm_Namen()
        zeige_Kopf()
        Zeige_Turm_0()
    } else {
        holeTurm(von_Turm)
        if (Turm3.length == 0) {
            music.play(music.tonePlayable(60, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
            write_xy(7, 0, "Turm ist leer")
        } else {
            Scheibe = Turm3[0]
            holeTurm(nach_Turm)
            if (Scheibe > Turm3[0]) {
                music.play(music.tonePlayable(60, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
                write_xy(7, 0, "Scheibe größer")
            } else {
                verschiebe()
                if (B.length == Scheiben_Zahl || C.length == Scheiben_Zahl) {
                    oledssd1306.setTextXY(7, 0)
                    oledssd1306.writeString("Fertig " + zug + " Züge")
                    basic.setLedColors(0x00ff00, 0x00ff00, 0x00ff00)
                }
            }
        }
    }
})
function Begrüßung () {
    write_xy(0, 0, "Türme von Hanoi")
    write_xy(1, 0, "Taste A:")
    write_xy(2, 3, "Aktion wählen")
    write_xy(3, 0, "Taste B:")
    write_xy(4, 3, "Aktion ausf.")
    write_xy(5, 0, "Taste A+B:")
    write_xy(6, 3, "Automatik")
    write_xy(7, 0, "Bitte warten")
    basic.pause(5000)
    oledssd1306.clearDisplay()
}
function Zeige_Turm_0 () {
    for (let Index = 0; Index <= prev(Scheiben_Zahl); Index++) {
        oledssd1306.setTextXY(Index + (6 - Scheiben_Zahl), 0)
        zeige_Scheibe(Index + 1)
    }
}
function chr2 (w: number) {
    return String.fromCharCode(w + 65)
}
function prev (anz: number) {
    tmp = anz - 1
    return tmp
}
function Scheibenzahl () {
    write_xy(0, 0, "Anzahl Scheiben")
    write_xy(2, 4, "Taste A: 3")
    write_xy(4, 4, "Taste B: 4")
    Start = 0
}
let tmp = 0
let j = 0
let Sch = ""
let Start = 0
let zug = 0
let Turm3: number[] = []
let zl = 0
let splt = 0
let Scheibe = 0
let txt = ""
let pos = 0
let nach_Turm = 0
let job_Linie: string[] = []
let job_Aktion: number[] = []
let job = 0
let Jobs: number[] = []
let C: number[] = []
let B: number[] = []
let Scheiben_Zahl = 0
let A: number[] = []
let von_Turm = 0
oledssd1306.initDisplay()
oledssd1306.clearDisplay()
von_Turm = 0
A = [1, 2, 3]
Scheiben_Zahl = A.length
B = [0]
B.shift()
C = [0]
C.shift()
Jobs = [
1,
2,
10,
12,
20,
21
]
job = 0
job_Aktion = [
1,
2,
10,
12,
20,
21
]
job_Linie = [
"+>-->+",
"+>------->+",
"+<--<+",
"+>-->+",
"+<-------<+",
"+<--<+"
]
von_Turm = 0
nach_Turm = 1
Begrüßung()
Scheibenzahl()
