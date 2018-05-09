/*
Javascript circular buffer
Author: Aaron Dallas
*/


class CircularBuffer {
    constructor(max_length) {
        this.max_length = max_length;
        this.buffer = new Array();
        this.read_index = null;
        this.write_index = null;
    }

    getLength() { return this.buffer.length; }

    append(obj) {
        this.write_index = this.write_index === null ? 0 : this.write_index + 1;

        if(this.write_index == this.max_length)
            this.write_index = 0;

        if(this.write_index == this.getLength()) {
            this.buffer.push(obj);
        }
        else {
            this.buffer[this.write_index] = obj;
        }
    }

    getCurr() {
        if(!this.getLength())
            throw new Error("Buffer is empty");

        return this.buffer[this.read_index];
    }

    getNext() {
        if(!this.getLength())
            throw new Error("Buffer is empty");

        this.read_index = this.read_index === null ? 0 : this.read_index + 1;

        if(this.read_index == this.getLength())
            this.read_index = 0;

        return this.buffer[this.read_index]
    }

    getPrev() {
        if(!this.getLength())
            throw new Error("Buffer is empty");

        this.read_index = this.read_index === null ? 0 : this.read_index - 1;
        if(this.read_index < 0)
            this.read_index = this.getLength() - 1;

        return this.buffer[this.read_index]
    }
}