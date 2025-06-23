"use client"

export class VoiceRecognition {
  private recognition: any | null = null
  private isListening = false

  constructor() {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      this.recognition = new (window as any).webkitSpeechRecognition()
      this.recognition.continuous = false
      this.recognition.interimResults = false
      this.recognition.lang = "en-US"
    }
  }

  async startListening(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        // Fallback to prompt for demo purposes
        const result = prompt("Voice input simulation - Enter your bid (e.g., 'bid 500'):")
        if (result) {
          resolve(result)
        } else {
          reject(new Error("No input provided"))
        }
        return
      }

      if (this.isListening) {
        reject(new Error("Already listening"))
        return
      }

      this.isListening = true

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        this.isListening = false
        resolve(transcript)
      }

      this.recognition.onerror = (event) => {
        this.isListening = false
        reject(new Error(`Speech recognition error: ${event.error}`))
      }

      this.recognition.onend = () => {
        this.isListening = false
      }

      this.recognition.start()
    })
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  parseBidAmount(transcript: string): number | null {
    const bidMatch = transcript.toLowerCase().match(/bid\s+(\d+)/)
    if (bidMatch) {
      return Number.parseInt(bidMatch[1])
    }

    const numberMatch = transcript.match(/(\d+)/)
    if (numberMatch) {
      return Number.parseInt(numberMatch[1])
    }

    return null
  }
}
