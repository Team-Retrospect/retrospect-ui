import React from 'react';

const Logo = () => {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/><circle cx="420.9" cy="296.5" r="45.7"/><path d="M520.5 78.1z"/></g></svg> */
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="300px"
      height="100px"
      viewBox="0 0 300 100"
      enable-background="new 0 0 300 100"
      // xml:space="preserve"
    >
      <g>
        <g>
          <path
            fill="#FFFFFF"
            d="M110.798,48.477c-0.587-0.098-1.192-0.146-1.815-0.146c-2.042,0-3.418,0.782-4.127,2.347V64.25h-4.457
			V44.404h4.256l0.109,2.22c1.076-1.724,2.568-2.586,4.476-2.586c0.636,0,1.161,0.086,1.577,0.257L110.798,48.477z"
          />
          <path
            fill="#FFFFFF"
            d="M122.004,64.616c-2.824,0-5.114-0.89-6.868-2.669c-1.755-1.778-2.632-4.147-2.632-7.106V54.29
			c0-1.979,0.382-3.75,1.146-5.31c0.764-1.559,1.836-2.771,3.218-3.64c1.382-0.869,2.923-1.303,4.622-1.303
			c2.701,0,4.789,0.862,6.264,2.586c1.473,1.724,2.209,4.163,2.209,7.316v1.799h-12.966c0.134,1.639,0.681,2.934,1.642,3.888
			c0.959,0.954,2.167,1.433,3.622,1.433c2.042,0,3.704-0.826,4.988-2.478l2.403,2.294c-0.796,1.186-1.855,2.105-3.184,2.759
			C125.143,64.288,123.654,64.616,122.004,64.616z M121.473,47.614c-1.224,0-2.211,0.429-2.963,1.284
			c-0.752,0.855-1.232,2.049-1.439,3.577h8.492v-0.332c-0.099-1.49-0.496-2.618-1.193-3.382
			C123.673,47.997,122.707,47.614,121.473,47.614z"
          />
          <path
            fill="#FFFFFF"
            d="M139.006,39.582v4.822h3.502v3.303h-3.502v11.076c0,0.758,0.148,1.307,0.448,1.643
			c0.3,0.336,0.835,0.504,1.604,0.504c0.514,0,1.033-0.062,1.56-0.185v3.448c-1.016,0.283-1.993,0.423-2.935,0.423
			c-3.424,0-5.136-1.89-5.136-5.667V47.707h-3.265v-3.303h3.265v-4.822H139.006z"
          />
          <path
            fill="#FFFFFF"
            d="M156.301,48.477c-0.588-0.098-1.191-0.146-1.816-0.146c-2.041,0-3.418,0.782-4.125,2.347V64.25H145.9
			V44.404h4.256l0.11,2.22c1.075-1.724,2.567-2.586,4.474-2.586c0.636,0,1.162,0.086,1.578,0.257L156.301,48.477z"
          />
          <path
            fill="#FFFFFF"
            d="M157.62,54.143c0-1.94,0.386-3.691,1.155-5.252c0.77-1.559,1.854-2.756,3.246-3.594
			c1.394-0.838,2.996-1.257,4.807-1.257c2.678,0,4.852,0.862,6.52,2.586c1.67,1.724,2.57,4.012,2.705,6.857l0.021,1.048
			c0,1.954-0.38,3.704-1.13,5.243c-0.752,1.541-1.826,2.732-3.228,3.576c-1.399,0.844-3.017,1.268-4.853,1.268
			c-2.801,0-5.039-0.934-6.721-2.797c-1.684-1.865-2.522-4.353-2.522-7.456V54.143L157.62,54.143z M162.076,54.529
			c0,2.041,0.422,3.641,1.266,4.796s2.02,1.733,3.522,1.733c1.502,0,2.673-0.59,3.513-1.764c0.836-1.173,1.256-2.891,1.256-5.152
			c0-2.004-0.432-3.595-1.293-4.77c-0.861-1.174-2.033-1.761-3.512-1.761c-1.455,0-2.611,0.578-3.467,1.733
			C162.505,50.501,162.076,52.229,162.076,54.529z"
          />
          <path
            fill="#FFFFFF"
            d="M190.962,58.857c0-0.795-0.325-1.401-0.981-1.815c-0.65-0.416-1.736-0.782-3.254-1.103
			c-1.516-0.316-2.781-0.722-3.797-1.209c-2.225-1.076-3.338-2.637-3.338-4.679c0-1.712,0.721-3.142,2.164-4.292
			c1.443-1.148,3.277-1.724,5.503-1.724c2.372,0,4.287,0.587,5.749,1.761c1.463,1.174,2.192,2.696,2.192,4.566h-4.458
			c0-0.855-0.317-1.567-0.953-2.137c-0.637-0.568-1.479-0.852-2.53-0.852c-0.979,0-1.776,0.226-2.394,0.678
			c-0.619,0.453-0.926,1.058-0.926,1.815c0,0.685,0.285,1.217,0.859,1.597c0.574,0.378,1.736,0.763,3.485,1.146
			c1.747,0.386,3.118,0.845,4.114,1.375c0.996,0.533,1.736,1.172,2.221,1.916c0.482,0.746,0.727,1.65,0.727,2.717
			c0,1.783-0.738,3.229-2.22,4.336s-3.419,1.661-5.813,1.661c-1.627,0-3.074-0.294-4.348-0.882
			c-1.271-0.586-2.262-1.395-2.971-2.422c-0.71-1.025-1.063-2.133-1.063-3.316h4.327c0.063,1.051,0.458,1.859,1.192,2.43
			c0.73,0.567,1.704,0.854,2.916,0.854c1.172,0,2.063-0.223,2.677-0.67C190.658,60.162,190.962,59.578,190.962,58.857z"
          />
          <path
            fill="#FFFFFF"
            d="M216.604,54.529c0,3.068-0.695,5.518-2.092,7.345c-1.395,1.828-3.265,2.742-5.613,2.742
			c-2.176,0-3.916-0.716-5.227-2.146v9.408h-4.457V44.404h4.109l0.184,2.018c1.307-1.589,3.088-2.384,5.338-2.384
			c2.42,0,4.318,0.902,5.694,2.706c1.374,1.803,2.063,4.306,2.063,7.509V54.529L216.604,54.529z M212.164,54.143
			c0-1.979-0.395-3.551-1.184-4.71c-0.789-1.162-1.916-1.743-3.383-1.743c-1.822,0-3.133,0.752-3.928,2.256v8.804
			c0.809,1.54,2.129,2.313,3.963,2.313c1.418,0,2.527-0.572,3.328-1.717C211.764,58.2,212.164,56.467,212.164,54.143z"
          />
          <path
            fill="#FFFFFF"
            d="M229.111,64.616c-2.825,0-5.113-0.89-6.869-2.669c-1.754-1.778-2.631-4.147-2.631-7.106V54.29
			c0-1.979,0.381-3.75,1.146-5.31c0.763-1.559,1.837-2.771,3.218-3.64c1.381-0.869,2.924-1.303,4.623-1.303
			c2.7,0,4.788,0.862,6.264,2.586c1.475,1.724,2.209,4.163,2.209,7.316v1.799h-12.967c0.135,1.639,0.683,2.934,1.644,3.888
			c0.959,0.954,2.166,1.433,3.621,1.433c2.043,0,3.705-0.826,4.987-2.478l2.403,2.294c-0.795,1.186-1.854,2.105-3.184,2.759
			C232.25,64.288,230.762,64.616,229.111,64.616z M228.579,47.614c-1.224,0-2.21,0.429-2.963,1.284
			c-0.751,0.855-1.231,2.049-1.439,3.577h8.493v-0.332c-0.1-1.49-0.496-2.618-1.193-3.382
			C230.779,47.997,229.813,47.614,228.579,47.614z"
          />
          <path
            fill="#FFFFFF"
            d="M248.68,61.059c1.113,0,2.035-0.324,2.771-0.973c0.733-0.646,1.126-1.449,1.175-2.402h4.199
			c-0.051,1.234-0.436,2.39-1.155,3.457c-0.721,1.069-1.7,1.918-2.935,2.541s-2.566,0.937-3.998,0.937
			c-2.775,0-4.977-0.898-6.604-2.696c-1.626-1.797-2.439-4.277-2.439-7.445V54.02c0-3.021,0.809-5.438,2.42-7.254
			c1.613-1.816,3.816-2.724,6.604-2.724c2.36,0,4.282,0.688,5.771,2.063c1.484,1.375,2.264,3.182,2.338,5.419h-4.199
			c-0.049-1.139-0.438-2.072-1.165-2.808c-0.728-0.734-1.653-1.101-2.778-1.101c-1.44,0-2.557,0.521-3.338,1.568
			c-0.783,1.046-1.181,2.631-1.193,4.758v0.718c0,2.149,0.392,3.756,1.166,4.813C246.09,60.529,247.213,61.059,248.68,61.059z"
          />
          <path
            fill="#FFFFFF"
            d="M265.773,39.582v4.822h3.502v3.303h-3.502v11.076c0,0.758,0.146,1.307,0.449,1.643
			c0.299,0.336,0.834,0.504,1.604,0.504c0.512,0,1.031-0.062,1.561-0.185v3.448c-1.018,0.283-1.994,0.423-2.938,0.423
			c-3.426,0-5.137-1.89-5.137-5.667V47.707h-3.266v-3.303h3.266v-4.822H265.773z"
          />
        </g>
      </g>
      <linearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1="66.9741"
        y1="556.4619"
        x2="50.4337"
        y2="546.1702"
        gradientTransform="matrix(1 0 0 1 8 -511)"
      >
        <stop offset="0" style="stop-color:#F3DEB5" />
        <stop offset="1" style="stop-color:#69C1BD" />
      </linearGradient>
      <path
        fill="url(#SVGID_1_)"
        d="M73.092,35.678C69,27.963,56.925,22.99,47.289,22.352h16.327c1.373,0,2.746,0.119,4.105,0.373
	c12.555,2.266,20.898,14.288,18.633,26.829c-0.081,0.452-0.174,0.893-0.293,1.332c-6.092,5.104-13.715,7.998-21.646,8.157
	c7.146-0.414,12.81-6.345,12.81-13.594C77.224,41.609,75.637,38.158,73.092,35.678z"
      />
      <linearGradient
        id="SVGID_2_"
        gradientUnits="userSpaceOnUse"
        x1="42.394"
        y1="570.7207"
        x2="78.0601"
        y2="570.7207"
        gradientTransform="matrix(1 0 0 1 8 -511)"
      >
        <stop offset="0" style="stop-color:#E38748" />
        <stop offset="1" style="stop-color:#EEBB40" />
      </linearGradient>
      <path
        fill="url(#SVGID_2_)"
        d="M64.414,59.043c7.932-0.159,15.555-3.053,21.646-8.157c-1.84,7.638-7.331,13.541-14.262,16.169
	c-3.798,1.438-8.01,1.903-12.288,1.131l-9.116-9.115h13.221C63.882,59.07,64.149,59.07,64.414,59.043z"
      />
      <linearGradient
        id="SVGID_3_"
        gradientUnits="userSpaceOnUse"
        x1="50.0493"
        y1="538.0957"
        x2="20.8981"
        y2="538.0957"
        gradientTransform="matrix(1 0 0 1 8 -511)"
      >
        <stop offset="0" style="stop-color:#377F8E" />
        <stop offset="1" style="stop-color:#69C1BD" />
      </linearGradient>
      <path
        fill="url(#SVGID_3_)"
        d="M39.265,13.408v8.943h4.024h3.999C56.925,22.99,69,27.963,73.092,35.678
	c-2.453-2.371-5.797-3.838-9.477-3.838h-24.35v8.943L25.579,27.096L39.265,13.408z"
      />
      <linearGradient
        id="SVGID_4_"
        gradientUnits="userSpaceOnUse"
        x1="77.625"
        y1="595.835"
        x2="59.2467"
        y2="581.1324"
        gradientTransform="matrix(1 0 0 1 8 -511)"
      >
        <stop offset="0" style="stop-color:#DF574F" />
        <stop offset="1" style="stop-color:#E38748" />
      </linearGradient>
      <path
        fill="url(#SVGID_4_)"
        d="M89.338,84.593h-6.877c-4.186,0-8.209-1.666-11.182-4.638l-11.77-11.77
	c4.278,0.771,8.49,0.306,12.289-1.134L89.338,84.593z"
      />
    </svg>
  );
};

export default Logo;