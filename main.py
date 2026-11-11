"""

Die Türme von Hanoi

Taste A: Aktion wechseln

Taste B: Aktion ausführen

Taste A+B: Automatischer Ablauf (Lösung)

Näheres bei Wikipedia oder demnächst bei 

https://www.prof-horst-guenther.de/calliope

"""
def zeige_Kopf():
    global von_Turm, nach_Turm, pos, txt
    von_Turm = job_Aktion[job] / 10
    von_Turm = Math.floor(von_Turm)
    nach_Turm = job_Aktion[job] % 10
    if job == 3 or job == 5:
        pos = 5
    else:
        pos = 0
    txt = job_Linie[job]
    write_xy(1, pos, txt)
    txt = "" + chr2(von_Turm) + " nach " + chr2(nach_Turm)
    write_xy(7, 0, txt)
def write_xy(z: number, s: number, Text: str):
    oledssd1306.set_text_xy(z, s)
    oledssd1306.write_string(Text)
def lösche_Scheibe(Turm: List[number]):
    global Scheibe, splt, zl
    Scheibe = Turm[0]
    splt = von_Turm * 5
    zl = 6 - len(Turm)
    oledssd1306.set_text_xy(zl, splt)
    oledssd1306.clear_range(5)
def hanoi(n: number, start: number, ziel: number, hilf: number):
    global von_Turm, nach_Turm, Scheibe
    if n == 0:
        return
    hanoi(n - 1, start, hilf, ziel)
    von_Turm = start
    nach_Turm = ziel
    holeTurm(start)
    Scheibe = Turm3[0]
    verschiebe()
    basic.pause(800)
    hanoi(n - 1, hilf, ziel, start)
def Turm_Namen():
    write_xy(0, 0, "A")
    write_xy(0, 5, "B")
    write_xy(0, 10, "C")
def verschiebe():
    global zug
    if nach_Turm == 0:
        einfügen_Scheibe(A)
        A.unshift(Scheibe)
    elif nach_Turm == 1:
        einfügen_Scheibe(B)
        B.unshift(Scheibe)
    else:
        einfügen_Scheibe(C)
        C.unshift(Scheibe)
    if von_Turm == 0:
        lösche_Scheibe(A)
        A.shift()
    elif von_Turm == 1:
        lösche_Scheibe(B)
        B.shift()
    else:
        lösche_Scheibe(C)
        C.shift()
    zug += 1
def holeTurm(TNr2: number):
    global Turm3
    if TNr2 == 0:
        Turm3 = A
    elif TNr2 == 1:
        Turm3 = B
    else:
        Turm3 = C

def on_button_a():
    global Scheiben_Zahl, Start, job, von_Turm
    if Start == 0:
        Scheiben_Zahl = 3
        Start = 1
        oledssd1306.clear_display()
        Turm_Namen()
        zeige_Kopf()
        Zeige_Turm_0()
    else:
        oledssd1306.set_text_xy(1, 0)
        oledssd1306.clear_range(16)
        oledssd1306.set_text_xy(7, 0)
        oledssd1306.clear_range(16)
        job += 1
        job = job % 6
        von_Turm = Jobs[job] / 10
        von_Turm = Math.floor(von_Turm)
        zeige_Kopf()
input.on_button_event(Button.A, input.button_event_click(), on_button_a)

def zeige_Scheibe(nr: number):
    global Sch, j
    Sch = ""
    j = 0
    while j <= prev(nr):
        # Scheibe mit oderr ohne Nummer
        if j == 0 and False:
            Sch = "" + Sch + ("" + str(nr))
        else:
            Sch = "" + Sch + "="
        j += 1
    oledssd1306.write_string(Sch)

def on_button_ab():
    global zug
    oledssd1306.clear_display()
    zug = 0
    Turm_Namen()
    Zeige_Turm_0()
    hanoi(Scheiben_Zahl, 0, 1, 2)
    oledssd1306.set_text_xy(7, 0)
    oledssd1306.write_string("Fertig " + str(zug) + " Züge")
input.on_button_event(Button.AB, input.button_event_click(), on_button_ab)

def einfügen_Scheibe(Turm2: List[any]):
    global splt, zl
    splt = nach_Turm * 5
    zl = 5 - len(Turm2)
    oledssd1306.set_text_xy(zl, splt)
    zeige_Scheibe(Scheibe)

def on_button_b():
    global Scheiben_Zahl, Scheibe
    if Start == 0:
        A.append(4)
        Scheiben_Zahl = 4
        oledssd1306.clear_display()
        Turm_Namen()
        zeige_Kopf()
        Zeige_Turm_0()
    else:
        holeTurm(von_Turm)
        if len(Turm3) == 0:
            music.play(music.tone_playable(60, music.beat(BeatFraction.DOUBLE)),
                music.PlaybackMode.UNTIL_DONE)
            write_xy(7, 0, "Turm ist leer")
        else:
            Scheibe = Turm3[0]
            holeTurm(nach_Turm)
            if Scheibe > Turm3[0]:
                music.play(music.tone_playable(60, music.beat(BeatFraction.DOUBLE)),
                    music.PlaybackMode.UNTIL_DONE)
                write_xy(7, 0, "Scheibe größer")
            else:
                verschiebe()
                if len(B) == Scheiben_Zahl or len(C) == Scheiben_Zahl:
                    oledssd1306.set_text_xy(7, 0)
                    oledssd1306.write_string("Fertig " + str(zug) + " Züge")
                    basic.set_led_colors(0x00ff00, 0x00ff00, 0x00ff00)
input.on_button_event(Button.B, input.button_event_click(), on_button_b)

def Begrüßung():
    write_xy(0, 0, "Türme von Hanoi")
    write_xy(1, 0, "Taste A:")
    write_xy(2, 3, "Aktion wählen")
    write_xy(3, 0, "Taste B:")
    write_xy(4, 3, "Aktion ausf.")
    write_xy(5, 0, "Taste A+B:")
    write_xy(6, 3, "Automatik")
    write_xy(7, 0, "Bitte warten")
    basic.pause(5000)
    oledssd1306.clear_display()
def Zeige_Turm_0():
    Index = 0
    while Index <= prev(Scheiben_Zahl):
        oledssd1306.set_text_xy(Index + (6 - Scheiben_Zahl), 0)
        zeige_Scheibe(Index + 1)
        Index += 1
def chr2(w: number):
    return String.from_char_code(w + 65)
def prev(anz: number):
    global tmp
    tmp = anz - 1
    return tmp
def Scheibenzahl():
    global Start
    write_xy(0, 0, "Anzahl Scheiben")
    write_xy(2, 4, "Taste A: 3")
    write_xy(4, 4, "Taste B: 4")
    Start = 0
tmp = 0
j = 0
Sch = ""
Start = 0
zug = 0
Turm3: List[number] = []
zl = 0
splt = 0
Scheibe = 0
txt = ""
pos = 0
nach_Turm = 0
job_Linie: List[str] = []
job_Aktion: List[number] = []
job = 0
Jobs: List[number] = []
C: List[number] = []
B: List[number] = []
Scheiben_Zahl = 0
A: List[number] = []
von_Turm = 0
oledssd1306.init_display()
oledssd1306.clear_display()
von_Turm = 0
A = [1, 2, 3]
Scheiben_Zahl = len(A)
B = [0]
B.shift()
C = [0]
C.shift()
Jobs = [1, 2, 10, 12, 20, 21]
job = 0
job_Aktion = [1, 2, 10, 12, 20, 21]
job_Linie = ["+>-->+",
    "+>------->+",
    "+<--<+",
    "+>-->+",
    "+<-------<+",
    "+<--<+"]
von_Turm = 0
nach_Turm = 1
Begrüßung()
Scheibenzahl()