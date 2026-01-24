from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

shared = {"cipher": "", "method": ""}


@app.route("/")
def home():
    return render_template("sender.html")


@app.route("/sender")
def sender():
    return render_template("sender.html")


@app.route("/receiver")
def receiver():
    return render_template("receiver.html", data=shared)


@app.route("/eavesdropper")
def eavesdropper():
    return render_template("eavesdropper.html", data=shared)


@app.route("/send", methods=["POST"])
def send():
    data = request.get_json()
    shared["cipher"] = data["cipher"]
    shared["method"] = data["method"]
    return jsonify({"status": "sent"})


if __name__ == "__main__":
    app.run(debug=True)
