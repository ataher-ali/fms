import React from 'react';

const Story = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
    </div>
  );
};

export default Story;